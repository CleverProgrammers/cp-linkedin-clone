import styled from 'styled-components';

const Rightside = (props) => {
    return (
        <Container>
            <FollowCard>
                <Title>
                    <h2>Add to your feed</h2>
                    <img src="/images/feed-icon.svg" alt="" />
                </Title>

                <FeedList>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#LinkedIn</span>
                            <button>Follow</button>
                        </div>
                    </li>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#Video</span>
                            <button>Follow</button>
                        </div>
                    </li>
                </FeedList>

                <Recommendation>
                    View all recommendations
                    <img src="/images/right-icon.svg" alt="" />
                </Recommendation>                
            </FollowCard>

            <BannerCard>
                <img src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg" alt="" />
            </BannerCard>
        </Container>
    );
};

const Container = styled.div`
    grid-area: rightside;
`;

const FollowCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 2px 3px 2px -2px rgba(110,104,104,0.75);
    padding: 12px;
`;

const Title =styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    width: 100%;
    color: rgba(0, 0, 0, 0.6);
`;

const FeedList = styled.ul`
    margin-top: 16px;
    
    li {
        display: flex;
        align-items: center;
        margin: 12px;
        position: relative;
        font-size: 14px;

        & > div {
            display: flex;
            flex-direction: column;
        }

        button {
            background-color: transparent;
            color: rgba(0, 0, 0, 0.6);
            box-shadow: 2px 3px 0px -2px rgba(110,104,104,0.75) inset;
            padding: 16px;
            align-items: center;
            border-radius: 15px;
            box-sizing: border-box;
            font-weight: 600;
            display: inline-flex;
            justify-content: center;
            max-height: 32px;
            max-width: 480px;
            text-align: center;
            outline: none;

            &:hover {
                background-color: rgba(0,0,0,0.08);
                cursor: pointer;
            }
        }
    }
`;

const Avatar = styled.div`
    background-image: url('https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 48px;
    height: 48px;
    margin-right: 8px;
`;

const Recommendation = styled.a`
    color: #0a66c2;
    display: flex;
    align-items: center;
    font-size: 14px;
`;

const BannerCard = styled(FollowCard)`
    img {
        width: 100%;
        height: 100%;
    }
`;

export default Rightside;