import React from "react";
import {
  StyledCardSection,
  StyledCardImage,
  StyledCardButton,
  StyledCardHeader,
  StyledCardTitle,
  StyledCardDescription,
  StyledAction,
} from "./Styles";

const Card = (props) => {
  const hasImage = props?.payload?.fields?.image?.stringValue;
  //   return <StyledCard sender={props.speaks}>asd</StyledCard>;
  return (
    <StyledCardSection>
      {hasImage ? (
        <StyledCardImage src={props?.payload?.fields?.image?.stringValue} />
      ) : null}

      <StyledCardTitle>
        {props?.payload?.fields?.header?.stringValue}
      </StyledCardTitle>

      <StyledCardDescription>
        {props?.payload?.fields?.description?.stringValue}
      </StyledCardDescription>

      <div className="card-action">
        <StyledAction
          target="_blank"
          rel="noopener noreferrer"
          href={props?.payload?.fields.link.stringValue}
        >
          {props?.payload?.fields?.button?.stringValue || "Go"}
        </StyledAction>
      </div>
    </StyledCardSection>
  );
};

export default Card;
