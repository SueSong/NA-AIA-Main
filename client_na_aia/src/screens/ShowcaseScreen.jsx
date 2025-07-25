import React from 'react';

const EventScreen = () => {
  return (
    <div>
        <div className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div>
                            <h1>Showcase</h1>
                            <h3>Witness cutting-edge AI projects demonstrated by innovators in the field.</h3>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hero-img-wrap">
                            <img src="/images/showcase_image.png"></img>
                        </div>
                    </div>
                </div>    
            </div>
		</div>
        <div className="container mt-10">   
            <div className="case-container" id="showcase-1-container">
                <div className="screenshot" >
                    <iframe className="elementor-video" width="640" height="360" src="https://www.youtube.com/embed/-54TBS8L6ZA?controls=1&amp;rel=0&amp;playsinline=0&amp;modestbranding=0&amp;autoplay=0&amp;start=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fvicedu.com&amp;widgetid=3" id="widget4" data-gtm-yt-inspected-18="true"></iframe>
                </div>
                <div className="description">
                    <h2 className="case-title">Louis Li —— How to build a robot that follows you</h2>
                    <ul>
                        <li>Technical director at a top North American Investment Bank for 20+ years
                            </li>
                        <li>Became one of Microsoft's first true AI engineers in 2017
                            </li>
                        <li>Head of the AI team and Architect Engineer at Microsoft
                            </li>
                        <li>Graduate of Stanford University's first cohort of its AI engineering program
                            </li>
                        <li>Master of Data Science from the University of California, Berkeley
                            </li>
					</ul>
                </div>
            </div>

            <div className="case-container" id="showcase-2-container">
                <div className="screenshot">
                <iframe className="elementor-video" width="640" height="360" src="https://www.youtube.com/embed/lq2Vd52NLKM?controls=1&amp;rel=0&amp;playsinline=0&amp;modestbranding=0&amp;autoplay=0&amp;start=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fvicedu.com&amp;widgetid=3" id="widget4" data-gtm-yt-inspected-18="true"></iframe>
                </div>
                <div className="description">
                    <h2 className="case-title">Integration of Hardware and Software</h2>
                    <p className="case-description">Not only do the children get exposed to cutting-edge technology, but they can also develop their logical thinking and problem-solving skills while enjoying the fun of learning and creation. They can also participate in prestigious competitions! <br/></p>
                </div>
            </div>

            
        </div>
    </div>
  )
}

export default EventScreen;