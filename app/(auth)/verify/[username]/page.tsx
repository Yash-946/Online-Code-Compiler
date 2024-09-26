"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Meteors from "@/components/magicui/meteors";

import { motion } from "framer-motion";
import {ArrowRight } from "lucide-react";




const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {children}
  </motion.div>
);

const formSchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

const VerificationCodeComponent = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = (e) => {
    console.log(e);
    
    // Handle form submission
  };

  return (


    <>



      <div className="relative   flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
        <Meteors number={100} />
       
        <div className="absolute z-[9999]  flex justify-center items-center  bg-background ">


          <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 font-Vesper text-primary">
                Verify Your Account
              </h1>
              <p className="mb-4 font-NTR text-foreground">Enter the verification code sent to your email</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-Kadwa text-foreground">Verification code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className=''>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="font-NTR text-muted-foreground">
                        Please enter the verification code sent to your email.
                      </FormDescription>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                {/* <Button type="submit" className="w-full font-Josefin bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit
                </Button> */}





                {/*  */}




                <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Submit
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </div>
                {/*  */}
              </form>
            </Form>
          </div>
        </div>
        </div>
  

    </>
  );
};

export default VerificationCodeComponent;