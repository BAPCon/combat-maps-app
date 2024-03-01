import { Box, Button, Card } from '@chakra-ui/react';
import { Loader } from '@googlemaps/js-api-loader';
import { renderToHTML } from 'next/dist/server/render';
import { useState } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import styles from './component.module.css'
import { renderIntoDocument } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Image from 'next/image';
let MarkerLib: any;

export function client_load(set_object: Function) {
    if (typeof window !== "undefined") {

        const loader = new Loader({
            apiKey: "AIzaSyDR4igdAcSepnlXhlUPDgI_ADw93enjkeo",
            version: "weekly",
            libraries: ["maps", "marker"]
        });

        const mapOptions = {
            center: {
                lat: 0,
                lng: 0
            },
            mapId: "6c23b48e430b78b",
            zoom: 4
        };

        let advancedMarkers: google.maps.MarkerLibrary;

        loader
            .importLibrary('marker')
            .then((AdvancedMarkerElement) => {
                
        loader
        .importLibrary('maps')
        .then(({ Map }) => {
            //@ts-ignore
            set_object(new Map(document.getElementById("map"), mapOptions), AdvancedMarkerElement);
        })
        .catch((e) => {
            // do something
        });

            })
            .catch((e) => {
                // do something
            });
        // Promise for a specific library
    }
}

export function waitForElement(selector: any, callback: () => void) {
    if (document.querySelector(selector)) {
      callback();
    } else {
      setTimeout(() => waitForElement(selector, callback), 500);
    }
  }

export class MapHandler
{

    map;
    set_params: Function;

    constructor(map: google.maps.Map | null, set_params: Function )
    {
        this.map = map;
        this.set_params = set_params;
    }

    async addMarker(position: Array<number>, marker_data: {id: string})
    {
        const icon_css = {
            backgroundColor:"red",
            width: 10,
            height: 10,
            borderRadius: "50%",
            boxShadow: "0px 0px 15px -2px rgba(0,0,0,0.16)"
        }
        console.log(this.map)
        let cont = document.createElement("div");
        //cont.innerHTML = renderToStaticMarkup(<img src="https://d1by4p17n947rt.cloudfront.net/icon/2eb2930111864beeb409e946751215b1-3ecb316865dc77cffc9cd77eed455da2.svg"></img>)
        cont.innerHTML = renderToStaticMarkup(<Box style={icon_css}></Box>)

        //@ts-ignore
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: this.map,
            position: { lat: position[0], lng: position[1] },
            content: cont
        });

        // Make React based infoWindow

        marker.addListener('click', () => {
            this.set_params(marker_data.id)
        });
    }
}