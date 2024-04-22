import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import EventDetail from "../fragments/detail/Event";

const HomeView = ({ events }: any) => {
  return (
    <section className="flex flex-col gap-5 my-5 px-3">
      <h2 className="text-3xl font-semibold">Events</h2>
      <div className="mx-auto" id="event">
        <Carousel className="w-full max-w-xs" id="events">
          <CarouselPrevious />
          <CarouselContent>
            {events.map((event: any, index: number) => (
              <CarouselItem key={index}>
                <EventDetail event={event} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
      <h2 className="text-3xl font-semibold">Tentang Kami</h2>
      <div className="mx-auto flex flex-col gap-3" id="about">
        <Card>
          <CardHeader className="text-xl font-semibold">Visi Kami</CardHeader>
          <CardContent>
            Kami berkomitmen untuk menjadi penyelenggara kompetisi renang terdepan yang mempromosikan gaya hidup sehat, semangat kompetitif, dan kesempatan bagi setiap individu untuk berkembang dalam olahraga renang.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-xl font-semibold">Misi Kami</CardHeader>
          <CardContent>
            <ul className="list-disc pl-6">
              <li>Memberikan platform untuk mengembangkan bakat renang.</li>
              <li>Mendorong partisipasi masyarakat dalam aktivitas renang.</li>
              <li>Memastikan penyelenggaraan kompetisi yang adil dan berkualitas.</li>
              <li>Menyebarkan kesadaran akan pentingnya olahraga renang untuk kesehatan dan kebugaran.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HomeView;
