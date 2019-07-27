import React, {Component} from "react";
import "./App.css";

import Pagination from "./components/Pagination";
import CountryCard from "./components/ResultCard";
import elasticSearch from 'elasticsearch';
import Modal from "./components/Modal";
import logo from './image/logo.png'

class App extends Component {
    state = {
        allCountries: [],
        currentCountries: [],
        currentPage: null,
        mobile: false,
        addModal: false,
        input: false,
        totalHits:0
    };

    componentDidMount() {
        document.querySelector("html").classList.add('js');
        this.client = new elasticSearch.Client({
            host: '192.168.137.1:9200',
        });
    }

    setInput(file) {
        console.log(file)
        const data = new FormData()
        data.append('file', file)
        let payload = {};
        payload.method = 'POST';
        payload.headers = {};
        payload.body = data;
        fetch('http://192.168.137.117:8080/api/v1/upload', payload)
            .then(res => res.text())
            .then(e =>  this.hideModal() && console.log(e))
            .catch(err => this.setState({input: false}))
    }

    showModal = () => {
        this.setState({addModal: true});
    };

    hideModal = () => {
        this.setState({addModal: false, input: false});
    };

    search = (data) => {
        this.client.search({
            index: 'documents',
            body: {
                "from": 0,
                "size": 52,
                // "size": 10000,
                // "_source": false,
                "query": {
                    "nested": {
                        "path": "contents",
                        "query": {
                            "bool": {
                                "must": [
                                    {"match": {"contents.content": data}}
                                ]
                            }
                        },
                        "inner_hits": {
                            "highlight": {
                                "pre_tags": ["<mark>"], "post_tags": ["</mark>"],
                                "fields": {
                                    "contents.content": {}
                                }
                            }
                        }
                    }
                }
            }
        }).then(e => this.setState({allCountries: e.hits.hits, totalHits: e.hits.total}))
    }

    onPageChanged = data => {
        const {allCountries} = this.state;
        const {currentPage, pageLimit} = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = allCountries.slice(offset, offset + pageLimit);

        this.setState({currentPage, currentCountries});
    };

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({allCountries: [], currentCountries: []})
            this.search(e.target.value)
        }
    }

    handleChange(selectorFiles) {
        this.setState({input: true});
        console.log(selectorFiles);
        this.setInput(selectorFiles[0])
    }

    render() {
        const {
            allCountries,
            currentCountries,
            totalHits
        } = this.state;
        const totalCountries = allCountries.length;
console.log(allCountries)
        const header = this.state.mobile ? "main_h open-nav" : "main_h";
        return (
            <div>
                <Modal show={this.state.addModal} handleClose={this.hideModal}>
                    <h1>Academic Documents</h1>
                    <h3>Please add new documents</h3>
                    <form action="#">
                        <div className="input-file-container">
                            <input ref={r => this.fileInput = r} className="input-file" id="my-file" type="file"
                                   accept="application/pdf"
                                   onClick={() => this.fileInput.focus()}
                                   onChange={(e) => this.handleChange(e.target.files)}/>
                            <label tabIndex={0} htmlFor="my-file" className="input-file-trigger">Select a file..</label>
                        </div>
                        <p className="file-return"/>
                    </form>
                    {this.state.input && <p>Uploading...</p>}
                </Modal>
                <header className={header}>
                    <div className="row">
                        {/*<a className="logo">DocHub</a>*/}
                        <img className="logo-img" src={logo}  alt="logo"/>
                        <div className="mobile-toggle" onClick={() => this.setState({mobile: !this.state.mobile})}>
                            <span/><span/><span/>
                        </div>
                        <nav>
                            <ul>
                                <li><a onClick={this.showModal}>Add Doc</a></li>
                                <li><a>Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <div className="container mb-5">
                    <div className="row d-flex flex-row py-5">
                        <div
                            className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div>
                                    <input type="text" name="query" className="question" id="nme" required
                                           autoComplete="off" onKeyPress={this._handleKeyPress}/>
                                    <label htmlFor="nme"><span>Enter keywords or phrases</span></label>
                                </div>
                            </div>
                            <div className="align-items-center">
                                <label className="text-dark py-4 pr-4 m-0">
                                    <strong className="text-secondary">{totalCountries}/{totalHits}</strong>{" "}Document show
                                </label>
                                {totalCountries !== 0 && <div className="d-flex flex-row py-4 align-items-center">
                                    <Pagination
                                        totalRecords={totalCountries}
                                        pageLimit={5}
                                        pageNeighbours={1}
                                        onPageChanged={this.onPageChanged}
                                    />
                                </div>}
                            </div>


                        </div>
                        {currentCountries.map(r => <CountryCard key={r._source.name} country={r}/>)}
                        {totalCountries === 0 && <div>No results.</div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
