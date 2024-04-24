import React, {ReactElement, useEffect} from 'react';
import './ContentLayout.css';
import {StageContent} from "../../data/StageContent.data";
import {Link, useNavigate} from "react-router-dom";
import {Card} from "../../data/Card.model";
import {ConceptContent} from "../../data/ConceptContent.data";

function ContentLayout(props: {type: string}): ReactElement {
    let title = '';
    const content: Card[] = getCardArray(props.type);

    function getCardArray(type: string | undefined): Card[] {
        if (!type) { return []; }

        let cardArray:Card[] = [];
        if (type === 'stage') {
            title = 'Stage Designs';
            cardArray = StageContent;
        } else if (type === 'concept') {
            title = 'Conceptual Designs';
            cardArray = ConceptContent;
        }

        return cardArray;
    }

    const navigate = useNavigate();
    useEffect((): void => {
        window.scrollTo(0, 0);
        if (content.length === 0) { navigate("/"); }
    }, [navigate, content]);

    function getCard(index: number): ReactElement {
        if (content[index].title.length !== 0) { return generateCard(index); }
        else { return <></> }
    }

    const generateCard = (index: number) => (
        <div className="col-12 lg:col-6 p-2 lg:pr-3">
            <Link to={`/${content[index].path}`} className="no-underline">
                <div className="surface-card shadow-2 p-3 flex flex-column transition" style={generateCardStyle(content[index])}>
                    <div className="text-4xl font-medium text-pink-50 mb-3">
                        { content[index].title }
                    </div>
                    <div className="text-700 line-height-3 mt-0 mb-0">
                        { content[index].text.map((text: string) => { return <p className="my-0">{text}</p> }) }
                    </div>
                </div>
            </Link>
        </div>
    );

    const generateCardStyle = (card: Card) => ({
        minHeight: card.image.length ? '350px' : '250px',
        justifyContent: card.image.length ? 'space-between' : '',
        backgroundImage: card.image.length ? `linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.90) 100%), url("${card.image}")` : '',
        backgroundRepeat: card.image.length ? 'no-repeat' : '',
        backgroundPosition: card.image.length ? 'center' : '',
        backgroundSize: card.image.length ? 'cover' : '',
        cursor: card.path.length ? 'pointer' : 'default'
    });
    
    return (
        <>
            <div className="text-4xl text-700 font-bold mb-4">
                {title}
            </div>
            <div className="grid mb-0 lg:mb-4">
                {getCard(0)}
                {getCard(1)}
            </div>
            <div className="grid">

                {getCard(2)}
                {getCard(3)}
            </div>
        </>
    );
}

export default ContentLayout;
