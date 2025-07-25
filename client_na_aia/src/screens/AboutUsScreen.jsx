import { TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const serviceList = [
  {
    title: "Innovate",
    description:
      "Foster innovation and advancement in AI research and facilitate the translation of these advancements into applications.",
    icon: <TrendingUp />,
  },
  // ... other services
];

const activities= [
  {
    icon: <TrendingUp />,
    title: "Events",
    description:
      "Host influential events, including conferences and educational workshops.",
  },
  // ... other activities
];

const UpButton = () => {
  const toTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    })
  }

  return (
    <Button
      onClick={toTop}
      className="fixed bottom-4 right-4 opacity-90 shadow-md bg-black"
      size="lg" >
      <ChevronUp className="h-4 w-4" />
    </Button>
  )
}

const HeaderSection = () => {
  return (  
    <div id="about" className="min-h-[calc(100vh-80px)] flex flex-column">
      <div className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div>
                            <h1>North America Artificial Intelligence (AI) Association</h1>
                            <p>Advancing AI research, education, and responsible use for the benefit of society.</p><br/>
                            <Link to="/membership">
                              <Button>Join NA-AIA</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hero-img-wrap">
                            <img src="/images/about_image.jpg" alt="About" />
                        </div>
                    </div>
                </div>    
            </div>
          </div>
      
      <section className="h-full grid grid-cols-2 relative scroll-mt-6">
        <div className="py-16 md:py-8 container mx-auto px-6 md:px-12 text-left flex flex-column justify-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Who We Are:
          </h1>
          <p className="text-md md:text-lg mb-8">
          The North America Artificial Intelligence (AI) Association (NAAIA) aims to advance and promote the AI research, education, spanning from elementary levels to university and career training, technology industrialization, and responsible use of artificial intelligence for the benefit of society, by fostering collaboration among AI professionals, academics, and industry leaders. Our goal is to make AI accessible and useful for everyone, enhancing learning, collaboration, and innovation in the professional world.
          </p>
        </div>
        <div className="p-5">
          <div className="bg-[#8fa1b8] h-full"></div>
        </div>
        <a href="#goals" className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ChevronDown />
        </a>
      </section>
    </div>
  )
}

const Goals = () => {
  return (
    <div id="goals" className="min-h-[calc(100vh-80px)] flex flex-column scroll-mt-6 relative">
      <section className="mt-20 container h-full">
        <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              NA-AIA's{" "}
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                Goals
              </span>
            </h2>

            <p className="text-muted-foreground text-xl mt-4 mb-8 ">
              Description
            </p>

            <div className="flex flex-col gap-8">
              {serviceList.map(({ icon, title, description }) => (
                <Card key={title}>
                  <Card.Header className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                    <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                      {icon}
                    </div>
                    <div>
                      <Card.Title>{title}</Card.Title>
                      <Card.Text className="text-md mt-2">
                        {description}
                      </Card.Text>
                    </div>
                  </Card.Header>
                </Card>
              ))}
            </div>
          </div>
        </div> 
        <a href="#activities" className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ChevronDown />
        </a> 
      </section>
              
    </div>
  )
}

const Activities = () => {
  return (
    <div id="activities" className="min-h-[calc(100vh-136px)] flex flex-column scroll-mt-6">
      <section className="mt-20 container h-full">
        <h2 className="text-3xl md:text-4xl font-bold ">
          NA-AIA's {" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Activities
          </span>
        </h2>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
          Description
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map(({ title, description, image }) => (
          <Card key={title}>
            <Card.Header>
              <Card.Title>{title}</Card.Title>
            </Card.Header>

            <Card.Body>{description}</Card.Body>
          </Card>
        ))}
      </div>
      </section>
    </div>
    
  );
};

const AboutUs = () => {
  return (
    <div className="">
      <HeaderSection />
      <Goals />
      <Activities />
      <UpButton />
    </div>
  )
}

export default AboutUs;
