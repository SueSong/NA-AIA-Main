import homeImg from '../assets/homeImage.webp';
import { Link } from 'react-router-dom';
import { Button} from "react-bootstrap";

const HomeScreen = () => {
 
  return (
    <div>
        <div className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div>
                            <h1>Welcome to NAAIA!</h1>
                            <p>The North America Artificial Intelligence (AI) Association aims to advance and promote the AI research, education, spanning from elementary levels to university and career training, technology industrialization, and responsible use of artificial intelligence for the benefit of society, by fostering collaboration among AI professionals, academics, and industry leaders. Our goal is to make AI accessible and useful for everyone, enhancing learning, collaboration, and innovation in the professional world.</p><br/>
                            <Link to="/about-us">
                              <Button>Read More About NA-AIA</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hero-img-wrap">
                            <img alt="Hero Illustration" loading="eager" width="620" height="620" decoding="async" data-nimg="1" className="object-cover" src={homeImg}></img>
                        </div>
                    </div>
                </div>    
            </div>
		</div>
      
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <div className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight">
                        Our Mission
                    </div>
                </div>
            </div>
            <div className="row block block-smartLayout last-block">
                <div className="row row-cols-1 row-cols-sm-3 g-4">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="css-1d2qp1f">
                                    <div className="css-10ul88n">
                                        <div className="css-1bvhodh">
                                            <p className="themed-heading css-14ogru3">1</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="css-24mkbj">
                                    <div className="block block-heading first-block">
                                        <div className="themed-heading">
                                            Drive Innovation
                                        </div>
                                    </div>
                                    <div className="block block-paragraph last-block">
                                        <div>
                                            We foster cutting-edge research and development in AI through collaboration and knowledge sharing.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="css-1d2qp1f">
                                    <div className="css-10ul88n">
                                        <div className="css-1bvhodh">
                                            <p className="themed-heading css-14ogru3">2</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="css-24mkbj">
                                    <div className="block block-heading first-block">
                                        <div className="themed-heading">
                                            Promote Ethical AI
                                        </div>
                                    </div>
                                    <div className="block block-paragraph last-block">
                                        <div>
                                            We advocate for responsible AI practices that prioritize human well-being and social impact.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="css-1d2qp1f">
                                    <div className="css-10ul88n">
                                        <div className="css-1bvhodh">
                                            <p className="themed-heading css-14ogru3">3</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="css-24mkbj">
                                    <div className="block block-heading first-block">
                                        <div className="themed-heading">
                                            Empower the Next Generation
                                        </div>
                                    </div>
                                    <div className="block block-paragraph last-block">
                                        <div>
                                            We provide educational resources and mentorship opportunities to cultivate future AI leaders.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 

  );
};
export default HomeScreen;