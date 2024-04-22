import { Card, CardContent, CardHeader } from "@/components/ui/card";

const EventDetail = ({ event }: any) => {
  return (
    <Card>
      <CardHeader className="text-center bold text-xl underline">Event Swim Race</CardHeader>
      <CardContent>Style: {event.style}</CardContent>
      <CardContent>Number: {event.number}</CardContent>
      <CardContent>Gender: {event.gender}</CardContent>
    </Card>
  );
};

export default EventDetail;
