/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type RelatedArtists_viewer = {
    readonly mainArtists: ({}) | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "RelatedArtists_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "mainKind",
      "type": "RelatedArtistsKind",
      "defaultValue": "MAIN"
    },
    {
      "kind": "LocalArgument",
      "name": "contemporaryKind",
      "type": "RelatedArtistsKind",
      "defaultValue": "CONTEMPORARY"
    },
    {
      "kind": "RootArgument",
      "name": "artistID",
      "type": "String!"
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "mainArtists",
      "name": "artist",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "artistID",
          "type": "String!"
        }
      ],
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "RelatedArtistsList_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "kind",
              "variableName": "mainKind",
              "type": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "__id",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '04f247ee2d035355769aa237e147fe3b';
export default node;
