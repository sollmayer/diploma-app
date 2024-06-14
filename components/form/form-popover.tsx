"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

interface IFormPopoverProps {
    children: React.ReactNode;
    // serverId: string;
    side?: "left" | "right" | "bottom" | "top";
    align?: "start" | "center" | "end";
    sideOffset?: number;
  }
  
export const FormPopover = ({
    children,
    // serverId,
    side = "bottom",
    align,
    sideOffset = 0,
}: IFormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const params = useParams();
  const { execute, fieldErrors } = useAction(createBoard, {
      onSuccess: (data) => {
        console.log({data})
        toast.success("Board Created!");
        closeRef.current?.click();
        router.push(`/board/${data.id}`);
      },
      onError: (error) => {
        console.log({error})
        toast.error(error);
      },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
  
    // execute({ data: { title, image }, serverId });
    execute({title, image})
  }
  return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          align={align}
          className="w-80 pt-3"
          side={side}
          sideOffset={sideOffset}
        >
          <div className="text-sm font-medium text-center text-neutral-600 pb-4">
            Create Board
          </div>
          <PopoverClose asChild  ref={closeRef}>
            <Button
              variant="ghost"
              className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
          <form action={onSubmit} className="space-y-4">
            <div className="space-y-4">
              <FormPicker id="image" errors={fieldErrors}/>
              <FormInput
                id="title"
                label="Board title"
                type="text"
                errors={fieldErrors}
              />
              <FormSubmit className="w-full">Create</FormSubmit>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    );
}