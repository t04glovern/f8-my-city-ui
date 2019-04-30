import React, { Component } from "react";
import {
  ReactiveBase,
  // DataSearch,
  MultiList,
  DateRange,
  SelectedFilters
} from "@appbaseio/reactivesearch";
import { ReactiveMap } from "@appbaseio/reactivemaps";
import { Button, Media } from 'react-bootstrap';

import "./App.css";

class App extends Component {

  // For list filters
  renderListItem = (label, count) => {
    return (
      <div>
        <b>{label}</b>
        <span style={{ marginLeft: 5, color: "#FFC440" }}>{count}</span>
      </div>
    );
  };

  handleClick(category, caseID) {
    fetch('https://mycity-f8.herokuapp.com/notification', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: category,
        sender_psid: caseID,
      })
    })
  }

  render() {
    const mapProps = {
      dataField: "location",
      autoCenter: true,
      defaultMapStyle: "Standard",
      title: "Reactive Maps",
      defaultZoom: 14,
      react: {
        and: ["LabelFilter", "DatePicker"]
      },
      searchAsMove: true,
      onPopoverClick: result => (
        <Media as="li">
          <img
            width={200}
            className="mr-3"
            src={result.url ? result.url : 'blank.png'}
            alt="Image"
          />
          <Media.Body>
            <h5>{result.category}</h5>
            <p>Case id: {result.caseID}</p>
            <p>
              {result.status_notes}
            </p>
            <Button variant="success" onClick={() => {
              this.handleClick(result.category, result.caseID)
            }}>Mark as Done</Button>
          </Media.Body>
        </Media>
      ),
      onData: result => ({
        icon: result.status === "Closed" ? 'success.png' : 'progress.png'
      }),
      showMapStyles: true
    };
    return (
      <div className="main-container">
        <ReactiveBase
          app="mycity"
          url="https://search-my-city-226l2pkgc5bzuuzvq6yvoaqtva.us-east-2.es.amazonaws.com"
          mapKey="AIzaSyCkEYsc4_-4mqhNSA6KR-7_PDXsu5p_qwo"
        >
          <div className="navbar">
            <div className="logo">
            <a href="#">
              <img src="logo.png" alt="Logo"></img>
            </a>
            <span style={{ paddingLeft: 10 }}>MyCity</span>
            </div>

            {/* <DataSearch
              className="datasearch"
              componentId="NavBarSearch"
              dataField={["status_notes", "status_notes.synonym", "category"]}
              queryFormat="and"
              placeholder="Search for keywords"
              innerClass={{
                input: "searchbox",
                list: "suggestionlist"
              }}
              autosuggest={true}
              iconPosition="left"
              filterLabel="search"
            /> */}

            <DateRange
              componentId="DatePicker"
              dataField="timestamp"
            />

          </div>

          <div className={"display"}>
            <div className={"leftSidebar"}>

            <MultiList
                componentId="LabelFilter"
                dataField="category"
                title="Labels"
                react={{
                  and: [
                    "DatePicker"
                  ]
                }}
                renderListItem={(label, count) =>
                  this.renderListItem(label, count)
                }
              />

              <hr></hr>

            </div>

            <div className={"mainBar"}>
              <SelectedFilters />

              <ReactiveMap
                componentId="map"
                {...mapProps}
              />
            </div>
          </div>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
