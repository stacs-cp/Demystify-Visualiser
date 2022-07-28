import React from "react";
import { Accordion, Card, Button, ListGroup } from "react-bootstrap";
import NavSwitcher from "../NavSwitcher";
import Explanation from "./Explanation";

/**
 * A sidebar that displays the deductions made on a given step, along with the explanations for that deduction.
 */
class ExplanationList extends React.Component {

  constructor(props) {
    super(props);
  }
  
 


  render() {
    const {
      simpleDeductions,
      deduction,
      choices,
      smallestMUSSize,
      extraChoice,
      boldBorder,
      optionDict
    } = this.props;

    


    return (
      <React.Fragment>
        <Card className="mt-3" border={boldBorder ? "primary" : "none"}>
          {
            /*For simple deductions (just one reason), display a collapsible list */
            simpleDeductions ? (
              <Accordion defaultActiveKey="1">
                <Card.Header>
                  <h5>Made {simpleDeductions.length} simple deductions.</h5>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Show/Hide
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <ListGroup style={{ maxHeight: "60vh", overflowY: "scroll" }}>
                    {simpleDeductions.map((deduction, i) => {
                      return (
                        <Explanation
                          highlighted={this.props.highlighted.includes(
                            i.toString()
                          )}
                          decision={deduction.decision}
                          reason={deduction.reason}
                          index={i}
                          key={i}
                          highlight={() => this.props.highlight(i)}
                          optionDict={optionDict}
                          getMeaningfulDecision={this.getMeaningfulDecision}
                        />
                      );
                    })}
                  </ListGroup>
                </Accordion.Collapse>
              </Accordion>
            ) : (
              deduction && (
                /* Otherwise we have an "interesting" deductions, 
                            so display the deductions with a list of reasons */
                <React.Fragment>
                  <Card.Header>
                    <h5>Made the following deduction:</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <b>{this.getMeaningfulDecision(deduction.decision)}</b>
                    </div>

                    <ListGroup
                      style={{ maxHeight: "75vh", overflowY: "scroll" }}
                    >
                      {deduction.reason.map((reason, i) => (
                        <Explanation
                          highlighted={this.props.highlighted.includes(
                            i.toString()
                          )}
                          reason={reason}
                          index={i}
                          key={i}
                          highlight={() => this.props.highlight(i)}
                          optionDict={optionDict}
                          getMeaningfulDecision={this.getMeaningfulDecision}
                        />
                      ))}
                    </ListGroup>
                  </Card.Body>
                </React.Fragment>
              )
            )
          }
        </Card>

        {
          /*If there are other choices, display a NavSwitcher to step through the alternatives */
          choices && (
            <Card className="mt-3">
              <Card.Header>
                <b>
                  Found {extraChoice ? choices.length + 1 : choices.length}{" "}
                  choices in total for this step:
                </b>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  See the alternative deductions with MUS size at least{" "}
                  {smallestMUSSize}:
                </div>
                <NavSwitcher
                  stepName={"Alt"}
                  className="p-3"
                  setCurrentStep={this.props.setChoice}
                  maxSteps={extraChoice ? choices.length : choices.length - 1}
                  currentStep={this.props.currentChoice}
                />
                <div>
                  <small className="text-muted">
                    (Note: different MUSs may result in deductions that look
                    identical)
                  </small>
                </div>
                {this.props.children}
              </Card.Body>
            </Card>
          )
        }
      </React.Fragment>
    );
  }

  getMeaningfulDecision = (decision) => {
    console.log("DECISION: " + decision);
    if (!decision) { 
      return decision;
    }
    let decisionRegExp = /(is not |is )((?:(?! is ).)+)(, | because:)/g;

    let optionDict = this.props.optionDict;

    let result = decision.replaceAll(decisionRegExp, function(match, p1, p2, p3) {
      let meaningfulAnswer = optionDict[p2] == undefined ? p2 : optionDict[p2];
      return p1 + meaningfulAnswer + p3;
    });
    console.log("RESULT: " + result);
    return result;
  };
}

export default ExplanationList;
