'use client';

import { groupAthlete } from "@/utils";
import { useSession } from "next-auth/react";
import userInstance from "@/instances/user";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/Input";
import { addAthlete } from "@/store/slices/athlete";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  fullname: z.string({ required_error: "Fullname is required" }),
  placeOfBirth: z.string({ required_error: "Place of Birth is required" }),
  dateOfBirth: z.string({ required_error: "Date of Birth is required" }),
  gender: z.enum(["male", "female"]),
  group: z.string({ required_error: "Group is required" }),
});

const AthleteForm = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const session: any = useSession();
  const token = session?.data.token;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      placeOfBirth: "",
      dateOfBirth: "",
      gender: "male",
      group: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    data.group = groupAthlete(data.dateOfBirth);

    try {
      const response = await userInstance.addAthlete(data, token);
      dispatch(addAthlete(response.data.data));
      successAlert(response.data.message);
      onClose();
    } catch (error) {
      errorAlert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Example" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="placeOfBirth"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Place of birth</FormLabel>
                <FormControl>
                  <Input placeholder="Example" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <input type="date" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {loading ? (
          <Button disabled className="mt-3">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="mt-3">
            Add
          </Button>
        )}
      </form>
    </Form>
  );
};

export default AthleteForm;
