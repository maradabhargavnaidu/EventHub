import { toast } from "sonner";
import * as Yup from "yup";

export const FormValidator = async (Schema: Yup.Schema<any>, data: any) => {
  try {
    await Schema.validate(data, { abortEarly: false });
    return true;
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const newErrors: { [key: string]: string } = {};
      err.inner.forEach((error) => {
        if (error.path) {
          newErrors[error.path] = error.message;
          toast.error(error.message);
        }
      });
    }
    return false;
  }
};
