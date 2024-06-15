import gqlStrings from "@/graphql/documents";
import { MutationCreateAnimationArgs } from "@/graphql/gql/graphql";
import { useNetwork } from "@/hooks/useNetwork";
import { setNextCursor } from "@/modules/animations/slice/filter";
import { useAppDispatch } from "@/store/hooks";
import { CreateAnimationApiResponse } from "@/types";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "urql";

type FormValues = {
  name: string;
  tags: string;
  file: File;
};

export const useUploadAnimation = () => {
  const isOnline = useNetwork();

  const dispatch = useAppDispatch();

  const [{ fetching }, createAnimation] = useMutation<
    CreateAnimationApiResponse,
    MutationCreateAnimationArgs
  >(gqlStrings.CreateAnimationMutation);

  const { register, handleSubmit, reset: resetForm } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async ({ file, name, tags }) => {
    try {
      await createAnimation({
        name,
        likes: 0,
        tags: tags.split(","),
        file: file[0],
      });

      dispatch(setNextCursor(""));
      closeModal();
      resetForm();
    } catch (error) {
      alert(error);
    }
  };

  const [open, setOpen] = useState(false);
  const closeModal = useCallback(() => setOpen(false), [setOpen]);
  const openModal = useCallback(() => setOpen(true), [setOpen]);

  return {
    isOnline,
    fetching,
    open,
    register,
    handleSubmit,
    onSubmit,
    openModal,
    closeModal,
  };
};
