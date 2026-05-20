import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  submitContactForm,
  getContacts,
  getSingleContact,
  updateContactStatus,
  deleteContact,
  replyToContact,
} from "../API/contactApi";

// 📨 SUBMIT CONTACT FORM
export const useSubmitContact = () => {
  return useMutation({
    mutationFn: submitContactForm,
  });
};

// 📥 GET ALL CONTACTS (ADMIN)
export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });
};

// 👁 GET SINGLE CONTACT
export const useSingleContact = (id) => {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => getSingleContact(id),
    enabled: !!id,
  });
};

// REPLY TO CONTACT
export const useReplyToContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: replyToContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

// ✏️ UPDATE STATUS
export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateContactStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

// ❌ DELETE CONTACT
export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};
