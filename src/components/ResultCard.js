import React, {Component, Fragment} from "react";
import Button from "./Button";

class ResultCard extends Component {
    render() {
        const source = this.props.country
        const name = source._source.name;
        const highlight = source.inner_hits.contents.hits.hits;
        let descMap = {};
        highlight.map(h => {
            let string = "";
            h.highlight["contents.content"].map(w => string = string + '<br/>' + w)
            descMap[h._source.pageNumber] = string
        })

        return (
            <Fragment>
                <div className="col-sm-12 col-md-12 country-card">
                    <div
                        className="country-card-container border-gray rounded border mx-2 my-3 d-flex flex-row p-0 bg-light">
                        <div className="px-3">
                            <span className="country-name text-dark d-block font-weight-bold">{name}</span>
                            {Object.keys(descMap).map(k => <div className="d-flex flex-row">
                                <p>{k}. pages</p>
                                <span className="country-region text-secondary"
                                      dangerouslySetInnerHTML={{__html: descMap[k]}}/>
                            </div>)}
                            <Button name="PDF"
                                    download={"http://192.168.137.117:8080/api/v1/file/"+source._id+".pdf"}/>
                        </div>
                    </div>

                </div>
            </Fragment>
        );
    }
}

export default ResultCard;
