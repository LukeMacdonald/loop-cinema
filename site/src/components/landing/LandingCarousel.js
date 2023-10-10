import ReleaseImage from '../../assets/images/release.jpg'
import CinemaImage from '../../assets/images/cinema.jpg'
import RatingImage from '../../assets/images/rating.jpg'
import Carousel from 'react-bootstrap/Carousel';
function LandingCarousel() {
    return (
        <div style={{ display: 'block', padding: '30px 0 30px 0', width:'100%', left:'0',top:'1.5rem',position:'absolute'}}>
            <Carousel controls={false} indicators={false} style={{borderRadius:'10%'}} fade>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100 overlay-image"
                        src= {ReleaseImage}
                        alt=""
                        style={{height:'30rem'}}
                    />
                    <Carousel.Caption>
                        <h3>Keep up to date on upcoming film releases</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={CinemaImage}
                        alt=""
                        style={{height:'30rem'}}
                    />
                    <Carousel.Caption>
                        <h3>Select a showing that works best with your schedule</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src={RatingImage}
                        alt=""
                        style={{height:'30rem'}}
                    />
                    <Carousel.Caption>
                        <h3>Share your opinions with the world!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default LandingCarousel;