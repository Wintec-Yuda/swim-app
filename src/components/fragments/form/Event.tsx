import { useSession } from "next-auth/react";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import { useEffect, useState } from "react";
import eventInstance from "@/instances/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { events } from "@/constants/Swimrace";

const formSchema = z.object({
  style: z.string({ required_error: "Style is required" }),
  number: z.string({ required_error: "Number is required" }),
  gender: z.enum(["male", "female"]),
});

const EventForm = ({ onClose }: { onClose: (data: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const [styles, setStyles] = useState<any>([]);

  const session: any = useSession();
  const token = session?.data.token;

  useEffect(() => {
    setStyles(Object.keys(events));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      style: "",
      number: "",
      gender: "male",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await eventInstance.addEvent(data, token);
      successAlert(response.data.message);
      onClose(response.data.data);
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
          name="style"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {styles.map((style: string, index: number) => (
                      <SelectItem key={index} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Number</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a number" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {form.watch("style") &&
                      events[form.watch("style") as keyof typeof events].map((number: string, index: number) => (
                        <SelectItem key={index} value={number}>
                          {number}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
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

export default EventForm;
