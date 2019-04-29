import React, { Component } from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  DateRange,
  TagCloud,
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
    const mapProps = {
      dataField: "location",
      autoCenter: true,
      defaultMapStyle: "Standard",
      title: "Reactive Maps",
      defaultZoom: 14,
      react: {
        and: ["NavBarSearch", "LabelFilter", "DatePicker", "TagCloud"]
      },
      searchAsMove: true,
      onPopoverClick: result => (
        <div>
          <b>{result.category}</b>
          <hr></hr>
          <p>{result.status_notes}</p>
          <img src={result.url ? result.url : 'blank.png'} alt='Image'></img>
        </div>
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
            <div className="logo">MyCity Search App</div>

            <DataSearch
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
                dataField="category"
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

              <hr></hr>

              <TagCloud
                componentId="TagCloud"
                dataField="request_type"
                multiSelect
                size={50}
              />

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
