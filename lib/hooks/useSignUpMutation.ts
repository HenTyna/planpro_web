import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SignupRequest } from "../types/auth";
import { authService } from "@/service/auth.service";
import { PasswordUtils } from "@/utils/PasswordUtils";
import { Path } from "@/utils/enum";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const useSignUpMutation = (setError: any) => {
    const router = useRouter();
    // const identification = useIdentification();

    return useMutation({
        mutationFn: (data: SignupRequest) => authService.signup(data),
        onSuccess: async (data, variables) => {
            try {
                // console.debug("Sign Up identification", JSON.stringify(identification));
                const result = await signIn("credentials", {
                    user_name: variables?.user_name,
                    password: PasswordUtils.decrypt(variables?.password),
                    // identification: JSON.stringify(identification),
                    callbackUrl: Path.TRIP,
                    redirect: false,
                })

                if (result?.ok) {
                    router.push(result?.url!)
                    return;
                }

                toast.error('Something went wrong')
                router.push('/login')
            } catch (e) {
                console.log('error', e)
            }
        },
        onError: (error: any) => {
            // Check if the error is related to a duplicate user_id

            setError('user_id', {
                type: 'manual',
                message: (error?.message || 'Something went wrong')
            });

        }

    });
}
export default useSignUpMutation;
