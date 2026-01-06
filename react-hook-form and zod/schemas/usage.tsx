import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../../react-hook-form and zod/schemas/form-validation.js";
import { useForm } from "react-hook-form";

// this is how you use the zod schema validation into react hook form
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormSchema>({ resolver: zodResolver(FormSchema) });

// create the function action after the form was submited, it will return data to the parameter that you may be post/put. this function will get wrap by "handlesubmit" function from react-hook-form
const handleSubmitLogin = (data: FormSchema) => {};

// this is how you use it into the form and input. also register it into react hook form (i demo it using typescript and shadcn)
const formExample = () => {

    return(
    <form
    onSubmit={handleSubmit(handleSubmitLogin)}
        className="flex h-[65vh] w-md flex-col items-start justify-center gap-6 rounded-r-2xl bg-white p-10"
      >
        {/* you must register the input with same name as the validation you make before in schemas */}
        <Input {...register("email")} type="email" placeholder="Contoh@gmail.com" />;

        {/* handling error with message depends on what you setting at schema validation file using zod */}
        {
            errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
            );
        }

        {/* this must be addeed inside the form to toggle the 'handlesubmit' from react-hook-form */}
        <Button type="submit" size={"lg"}>
              Masuk
        </Button>
    </form>
)
}