/*
 *
 * Stories Listing
 *
 */

import React, { useEffect, useState, memo } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'
import { Helmet } from "react-helmet";
import URL from "../../API";
import ListItem from "../../components/ListItem";
import { StoryType } from "./types"

interface OwnProps extends RouteComponentProps { }
type Props = OwnProps;

function Stories(props: Props) {
    const [loading, setLoading] = useState(true);
    const [stories, setStories] = useState<StoryType[]>([]);
    useEffect(() => {
        fetch(
            `${URL}/topstories.json?print=pretty`
        ).then(res => res.json())
            .then(response => {
                const topTenStoryIDs: [] = response.slice(0, 10);
                let storiesTopTen: StoryType[] = [];

                topTenStoryIDs.forEach(topTenStoryID => {
                    fetch(
                        `${URL}/item/${topTenStoryID}.json?print=pretty`
                    )
                        .then(res => res.json())
                        .then(response => {
                            storiesTopTen.push(response);
                        }).catch(error => console.log(error));
                });
                setStories(storiesTopTen);
                setLoading(false);
            }
            )
            .catch(error => console.log(error));

    }, []);

    console.log("Object.keys(stories).length", Object.keys(stories).length);
    console.log("stories[0]", stories[0]);
    console.log(stories);
    // console.log(stories);
    // console.log(stories[0]);
    // console.log(stories.length);
    // console.log(typeof stories);
    return (
        <div>
            <Helmet>
                <title>Stories Listing</title>
                <meta name="description" content="Stories Listing" />
            </Helmet>
            {!loading ?
                Object.keys(stories).length !== 0 ? (<div>No data</div>) :
                    (<div>
                        {stories.map((storyItem) => (
                            <Link to={`/story/${storyItem.id}`} key={`item - ${storyItem.id}`}>
                                <ListItem storyItem />
                            </Link >
                        ))}
                    </div>
                    ) :
                <div>Loading...</div>}

        </div>
    );
}

export default memo(Stories);