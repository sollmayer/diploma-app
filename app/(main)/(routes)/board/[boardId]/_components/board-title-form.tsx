"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface IBoardTitleFormProps {
    data: Board;
  }
export const BoardTitleForm = ({ data }: IBoardTitleFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(data.title);

    const { execute } = useAction(updateBoard, {
        onSuccess: (data) => {
          toast.success(`Board "${data.title}" updated!`);
          disableEditing();
          setTitle(data.title);
        },
        onError: (error) => {
          toast.error(error);
        },
    });


    const disableEditing = () => setEditing(false);

    const enableEditing = () => {
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        });
        setEditing(true);
    };

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        if (title === data.title) {
          return disableEditing();
        }
        execute({ title, id: data.id });
    };
    const onBlur = () => {
        formRef.current?.requestSubmit();
    };
    if (isEditing) {
        return (
          <form
            action={onSubmit}
            ref={formRef}
            className="flex items-center gap-x-2"
          >
            <FormInput
              id="title"
              ref={inputRef}
              onBlur={onBlur}
              defaultValue={title}
              className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 border-none"
            />
          </form>
        );
      }

    return (
        <Button
            onClick={enableEditing}
            variant="transparent"
            className="font-bold text-lg h-auto w-auto py-1 px-2"
        >
            {title}
        </Button>
    );
}