import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import { success } from "../../notify";
import {
    Button, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption,
} from "reactstrap"
import { Link } from 'react-router-dom';
import { categoriesUrl, itemsUrl } from '../../Redux/dataBase';

const items = [
    {
        src: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg',
        altText: 'Pink Flower',
        caption: 'Pink Flower',
        key: 1,
    },
    {
        src: 'https://images.pexels.com/photos/67857/daisy-flower-spring-marguerite-67857.jpeg',
        altText: 'White Flower',
        caption: 'White Flower',
        key: 2,
    },
    {
        src: 'https://images.pexels.com/photos/1477166/pexels-photo-1477166.jpeg',
        altText: 'Orange Flower',
        caption: 'Orange Flower',
        key: 3,
    },
    {
        src: 'https://images.pexels.com/photos/54323/rose-composites-flowers-spring-54323.jpeg',
        altText: 'Pink Flower 2',
        caption: 'Pink Flower 2',
        key: 4,
    },
    {
        src: 'https://images.pexels.com/photos/53135/hydrangea-blossom-bloom-flower-53135.jpeg',
        altText: 'Blue Flower',
        caption: 'Blue Flower',
        key: 5,
    },
];

class Home extends Component {
    state = {
        activeIndex: 0,
        animating: false,
    };


    next = () => {
        if (this.state.animating) return;
        const nextIndex =
            this.state.activeIndex === items.length - 1
                ? 0
                : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    };

    previous = () => {
        if (this.state.animating) return;
        const nextIndex =
            this.state.activeIndex === 0
                ? items.length - 1
                : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    };

    goToIndex = (newIndex) => {
        if (this.state.animating) return;
        this.setState({ activeIndex: newIndex });
    };

    // componentDidUpdate() {
    //     if (!this.props.itemLoading && !this.props.commentLoading && !this.props.categoryLoading && !this.props.categoryErr && !this.props.itemErr && !this.props.commentErr) {
    //         success("Database Updated...", true);
    //     }
    // }
    render() {
        document.title = "Home - Photo Gallery App";

        const { activeIndex } = this.state;

        const slides = items.map((item) => (
            <CarouselItem
                onExiting={() => this.setState({ animating: true })}
                onExited={() => this.setState({ animating: false })}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} style={{ aspectRatio: "16/9", objectFit: 'cover', width: "100%", height: "500px", borderRadius: "10px" }} />
                <CarouselCaption
                    captionHeader={item.caption}
                    captionText={item.caption}
                />
            </CarouselItem>
        ));

        return (
            <div >
                <div>
                    <div className='p-2 m-2 fgColor' style={{ textAlign: "center", borderRadius: "10px" }}>
                        <div>
                            <Carousel
                                activeIndex={activeIndex}
                                next={this.next}
                                previous={this.previous}
                                {...this.props}
                            >
                                <CarouselIndicators
                                    items={items}
                                    activeIndex={activeIndex}
                                    onClickHandler={this.goToIndex}
                                />
                                {slides}
                                <CarouselControl
                                    direction="prev"
                                    directionText="Previous"
                                    onClickHandler={this.previous}
                                />
                                <CarouselControl
                                    direction="next"
                                    directionText="Next"
                                    onClickHandler={this.next}
                                />
                            </Carousel>
                            <h1 className='mt-3'>The Great Ever Flowers Gallary</h1>
                            <p style={{ fontSize: "20px", color: "grey" }}>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.
                            </p>
                            <Link to={itemsUrl}>
                                <Button color="primary" className='m-2'>Browse Photos</Button>
                            </Link>
                            <Link to={categoriesUrl}>
                                <Button color="secondary" className='m-2'>Browse Categories</Button>
                            </Link>
                        </div>
                    </div>
                    <div className='p-2 m-2 fgColor' style={{ textAlign: "center", borderRadius: "10px" }}>
                        <div style={{ margin: "25px 5px 25px 5px" }} >
                            <h2>Why Flowers Are Important In Our Life?</h2>
                            <p style={{ fontSize: "18px", color: "grey" }}>
                                The importance of flowers is everywhere. From nature to human use, they are important. They can feed insects, birds, animals and humans. Further, they provide natural medicines for humans and some animals. Most importantly, without flowers, plants would simply be green, and the world would be a duller place.
                            </p>
                            <div className='d-flex justify-content-center flex-wrap'>
                                <img style={{ aspectRatio: "16/9", objectFit: 'cover', width: "300px", height: "200px", borderRadius: "5px", margin: "5px" }} alt="Sample" src="https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg" />

                                <img style={{ aspectRatio: "16/9", objectFit: 'cover', width: "300px", height: "200px", borderRadius: "5px", margin: "5px" }} alt="Sample" src="https://images.pexels.com/photos/46216/sunflower-flowers-bright-yellow-46216.jpeg" />

                                <img style={{ aspectRatio: "16/9", objectFit: 'cover', width: "300px", height: "200px", borderRadius: "5px", margin: "5px" }} alt="Sample" src="https://images.pexels.com/photos/39517/rose-flower-blossom-bloom-39517.jpeg" />
                            </div>
                        </div>
                    </div>
                    <div className='p-2 m-2 fgColor' style={{ textAlign: "center", borderRadius: "10px" }}>
                        <div style={{ margin: "25px 5px 25px 5px" }} >
                            <h2>How Do Flowers Help Humans?</h2>
                            <p style={{ fontSize: "18px", color: "grey" }}>
                                Flowers increase levels of positive energy in humans. Moreover, they also help us feel relaxed and secure. Similarly, they add beauty to our environment and reduce stress levels at our home or workplace by making us feel happy.
                            </p>
                            <div className='d-flex justify-content-center flex-wrap'>
                                <img style={{ aspectRatio: "16/9", objectFit: 'cover', width: "300px", height: "200px", borderRadius: "5px", margin: "5px" }} alt="Sample" src="https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg" />

                                <img style={{ aspectRatio: "16/9", objectFit: 'cover', width: "300px", height: "200px", borderRadius: "5px", margin: "5px" }} alt="Sample" src="https://images.pexels.com/photos/1477166/pexels-photo-1477166.jpeg" />

                                <img style={{ aspectRatio: "16/9", objectFit: 'cover', width: "300px", height: "200px", borderRadius: "5px", margin: "5px" }} alt="Sample" src="https://images.pexels.com/photos/462402/pexels-photo-462402.jpeg" />
                            </div>
                        </div>
                    </div>
                    <div className='p-2 m-2 fgColor' style={{ borderRadius: "10px", textAlign: "left" }}>
                        <div style={{ margin: "25px 5px 25px 5px" }} >
                            <h3>About Flowers : </h3>
                            <p style={{ fontSize: "18px", color: "grey" }}>
                                There are many things in nature for which we should be thankful. One of them definitely has to be flowers. There are many types of flowers which we see in our environment. The beautiful fragrances and flowers enhance the beauty of our planet earth. Through flowers essay, we will look at what these beautiful things do and how much joy they bring.
                            </p>
                            <h4>Importance Of Flowers : </h4>
                            <p style={{ fontSize: "18px", color: "grey" }}>
                                Flowers carry a lot of importance in our lives. In India, no worship of God is complete without some kind of flower. Devotees make a garland of flowers to dedicate it to God. In addition, we also use flowers for special occasions like weddings. <br /> <br />

                                The bride and groom wear garlands of flowers to signify their marriage. In addition, flowers smell so good that we use it in different places by planting them in our garden. This way, the beauty of our place enhances. <br /> <br />

                                Flowers carry importance in each nook and corner of the world. They also come in use for making medicines. Similarly, we also make difference in fragrance perfumes from the flowers. Further, the butterflies, birds and bees take the flowers as food. <br /> <br />

                                In many weddings, the bride carries a bouquet of flowers when she walks down the aisle. Thus, it is very symbolic in that sense. On special occasions of valentines and anniversary, we gift our partners’ beautiful flowers as a symbol of our love. <br /> <br />

                                Similarly, we send flowers for someone who is sick to brighten their day. We also send flowers as a token of condolence during funerals. Thus, we see they have so many uses in so many areas.
                            </p>
                            <h4>My Favourite Flower : </h4>
                            <p style={{ fontSize: "18px", color: "grey" }}>
                                My favourite flower is rose. I like other flowers too but I find the rose to be the most beautiful among all flowers. It is also called the king of flowers. They come in many colours so it offers great variety.<br /><br />

                                For instance, they are available in red, pink, white, yellow, blue and more. My favourite is the white rose. Even though the rose has small and sharp thorns on its stem, people love picking roses.<br /><br />

                                It looks beautiful when it blooms in the garden or is kept at the florist’s shop. Often we see the rose as a symbol of beauty and love. The rose has soft petals and a very sweet fragrance. It comes in use in many ceremonies for decorations purposes.<br /><br />

                                Moreover, garlands of roses are used in places of worship. Similarly, it is a great flower which always stands out from the rest of the flowers. I have planted roses in my garden as well with the help of my grandfather.
                            </p>
                            <h4>Conclusion : </h4>
                            <p style={{ fontSize: "18px", color: "grey" }}>
                                Therefore, flowers are an essential part of our lives. They are responsible for bringing happiness in our lives and making our surrounding environment a prettier place to live in. Thus, we must all plant flowers at homes and in our neighbourhood to beautify the place and bring happiness and joy for everyone passing by.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Home);