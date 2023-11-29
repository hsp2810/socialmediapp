import * as z from "zod";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";

const SignupForm = () => {
  const { toast } = useToast();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong when creating your account.",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session)
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong when creating your account.",
      });
  }

  return (
    <main className='md:w-1/2 px-10 flex flex-col justify-center items-center'>
      <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
          <h1 className='h3-bold text-3xl md:h2-bold pt-12 sm:pt-5 mb-4'>
            Create a new account
          </h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-5 w-full mt-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} className='shad-input' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} className='shad-input' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} className='shad-input' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} className='shad-input' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-start space-x-2'>
              <Checkbox id='terms2' />
              <label
                htmlFor='terms2'
                className='text-xs font-xs peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                By creating an account you agree on all the{" "}
                <Link to={"/"}>Terms and Conditions</Link>.
              </label>
            </div>

            <Button
              type='submit'
              className='shad-button_primary font-semibold text-md mt-2'
            >
              {isCreatingUser ? (
                <div className='flex-center gap-2'>
                  <Loader /> Loading...
                </div>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>

          <div className='mt-6 text-sm'>
            Already have an account?
            <Link
              to={"/sign-in"}
              className='hover:underline text-primary-500 font-semibold'
            >
              {" "}
              Sign in
            </Link>
          </div>
        </div>
      </Form>
    </main>
  );
};

export default SignupForm;
