import React, { Component } from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  DateRange,
  SelectedFilters
} from "@appbaseio/reactivesearch";
import { ReactiveMap } from "@appbaseio/reactivemaps";

import "./App.css";

class App extends Component {

  // For list filters
  renderListItem = (label, count) => {
    return (
      <div>
        {label}
        <span style={{ marginLeft: 5, color: "#3b5998" }}>{count}</span>
      </div>
    );
  };

  render() {
    return (
      <div className="main-container">
        <ReactiveBase
          app="mycity"
          url="https://search-my-city-226l2pkgc5bzuuzvq6yvoaqtva.us-east-2.es.amazonaws.com"
          mapKey="AIzaSyCkEYsc4_-4mqhNSA6KR-7_PDXsu5p_qwo"
        >
          <div className="navbar">
            <div className="logo">MyCity Search App</div>

            <DataSearch
              className="datasearch"
              componentId="NavBarSearch"
              dataField={["text", "text.synonym"]}
              queryFormat="and"
              placeholder="Search for keywords"
              innerClass={{
                input: "searchbox",
                list: "suggestionlist"
              }}
              autosuggest={true}
              iconPosition="left"
              filterLabel="search"
            />

            <DateRange
              componentId="DatePicker"
              dataField="timestamp"
            />

          </div>

          <div className={"display"}>
            <div className={"leftSidebar"}>

            <MultiList
                componentId="LabelFilter"
                dataField="text.keyword"
                title="Labels"
                react={{
                  and: [
                    "NavBarSearch", "DatePicker"
                  ]
                }}
                renderListItem={(label, count) =>
                  this.renderListItem(label, count)
                }
              />

            </div>

            <div className={"mainBar"}>
              <SelectedFilters />

              <ReactiveMap
                showSearchAsMove={false}
                defaultMapStyle="Standard"
                componentId="map"
                dataField="location"
                react={{
                  and: ["NavBarSearch", "LabelFilter", "DatePicker"]
                }}
                onData={result => ({
                  custom: (
                    <div>
                      <b>{result.text}</b>
                      <img src={result.url} ></img>
                    </div>
                  )
                })}
                defaultZoom={15}
                autoCenter={true}
                showMarkerClusters={true}
              />
            </div>
          </div>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
