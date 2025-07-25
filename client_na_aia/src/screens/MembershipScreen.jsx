import React from "react";
import { Check, Container } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, Button, CardHeader, CardTitle, CardFooter } from 'react-bootstrap';

const pricingList = [
  {
    title: "Regular",
    price: 30,
    description:
      "For individuals interested in AI who want to stay informed and connected with the AI community.",
    buttonText: "Become a member",
    benefitList: [
      //"access to []",
      // "2 GB Storage",
      // "Upto 4 pages",
      // "Community support",
      // "lorem ipsum dolor",
    ],
  },
  {
    title: "Student",
    price: 15,
    description:
      "For students who are passionate about AI and want to connect with like-minded individuals.",
    buttonText: "Become a member",
    benefitList: [
      //"access to []",
      // "4 GB Storage",
      // "Upto 6 pages",
      // "Priority support",
      // "lorem ipsum dolor",
    ],
  },
  {
    title: "Corporate",
    price: 100,
    description:
      "For organizations looking to support the AI community and gain access to exclusive benefits.",
    buttonText: "Become a member",
    benefitList: [
      //"access to []",
      // "8 GB Storage",
      // "Upto 10 pages",
      // "Priority support",
      // "lorem ipsum dolor",
    ],
  },
];

const MembershipScreen = () => {
  const navigate = useNavigate();

  const handleClick = (type) => {
    navigate('/checkout', {state: {membershipType: type}});
  }

  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1>Membership Benefits</h1>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted fw-bold">Exclusive Networking</h6>
                            <p className="card-text text-muted">Connect with leading AI professionals and experts in our community.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-subtitle mb-2 text-muted fw-bold">Access to Resources</h4>
                            <p className="card-text text-muted">Gain access to exclusive content, workshops, and research materials.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted fw-bold">Career Advancement</h6>
                            <p className="card-text text-muted">Benefit from professional development opportunities and mentorship programs.</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
                <div className="hero-img-wrap">
                    <img src="/images/membership_image.png"></img>
                </div>
            </div>   
          </div>
        </div>  
		  </div>
 

      <div className="container m-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Become a Member
        </h2>
        <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Members of the North America AI Association (NAAIA) enjoy a range of benefits tailored to enhance their engagement with the AI community.
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingList.map((pricing) => (
            <Card
              key={pricing.title}
            >
              <CardHeader>
                <CardTitle className="flex item-center justify-between">
                  {pricing.title}
                </CardTitle>
                <div>
                  <span className="text-3xl font-bold">${pricing.price}</span>
                  <span className="text-muted-foreground"> /year</span>
                </div>

                <div>{pricing.description}</div>
              </CardHeader>

              <div>
                <Button className="w-full" onClick={() => handleClick(pricing.title)}>{pricing.buttonText}</Button>
              </div>

              <hr className="w-4/5 m-auto mb-4" />

              <CardFooter className="flex">
                <div className="space-y-4">
                  {pricing.benefitList.map((benefit) => (
                    <span
                      key={benefit}
                      className="flex"
                    >
                      <Check className="text-green-500" />{" "}
                      <h3 className="ml-2">{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipScreen;