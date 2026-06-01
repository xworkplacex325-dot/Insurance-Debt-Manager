// hooks/useUploadAvatar.js
import { supabase } from "./useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';

export function useUploadAvatar(userID) {  // ✅ remove `file` from here
  const queryClient = useQueryClient();

  const avatarMutation = useMutation({
    mutationFn: async (file) => {  // ✅ receive file here instead
      const fileExt = file.name.split(".").pop();
      const filePath = `${userID}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const { data, error: dbError } = await supabase
        .from("avatars")
        .upsert({ user_id: userID, url: publicUrl })
        .select()
        .single();
      if (dbError) throw dbError;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avatar", userID] });
      toast.success("Avatar uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { avatarMutation };
}