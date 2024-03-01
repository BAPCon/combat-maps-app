## combat-maps-app
The `next.js` codebase for the [`combat-maps`](/BAPcon) web app. 

Additional serverless functions and AWS templates are in the [`backend/pipeline`](/BAPcon/combat-maps-pipeline) repository.
<div>

<span style="margin-right:10px;">[![Next.js]](https://github.com/BAPCon/combat-maps-app/blob/master/package.json)</span>
<span style="margin-right:10px;">[![site-link]](https://combat-maps.vercel.app/)</span>
<span style="margin-right:10px;">[![aws-templates]]()</span>

</div>

---

### Technology Stack

<table>
<tbody>
<tr><th>Category</th><th>Technology Names</th></tr>
<tr>
    <td>Framework</td>
    <td><a href="/">Next.js</a></td>
</tr>
<tr>
    <td>Components</td>
    <td><a href='https://chakra-ui.com/docs/components'>Chakra UI</a></td>
</tr>
<tr>
    <td>Libraries</td>
    <td>
    <a href='https://github.com/googlemaps/js-api-loader'>Google Maps API Loader</a>, 
    <a href='https://github.com/googlemaps/js-markerclusterer'>Marker Clusterer</a>
    </td>
</tr>
<tr>
    <td>Backend - API</td>
    <td><a href='https://aws.amazon.com/api-gateway/'>API Gateway</a></td>
</tr>
<tr>
    <td>Database</td>
    <td><a href='https://aws.amazon.com/dynamodb/'>DynamoDB</a> => <a href='https://aws.amazon.com/s3/'>static S3 (json)</a></td>
</tr>
<tr>
    <td>Frontend</td>
    <td>
    <a href='https://vercel.com/'>Vercel</a>
    </td>
</tr>
<tr>
    <td>Backend</td>
    <td>
    <a href='https://aws.amazon.com/'>AWS</a>
    </td>
</tr>
</tbody></table>


## About

Combat Maps is a web application that displays [AI geotagged posts](https://www.github.com/BAPCon/combat-maps-backend) from sources like [`r/combatfootage`](https://www.reddit.com/r/combatfootage) and [`Funker530.com`](https://www.funker530.com).

Using finetuned GPT-3.5 models and [`stanford/stanza`](https://github.com/stanfordnlp/stanza) (NLP library), video posts from these sources are processed and a best guess geotag is generated.

#### Visit deployment: 
#### https://combat-maps.vercel.app/
<i style="color:red">Project license</i>

### Deployment

```python
# This repository can be deployed directly to Vercel
# An API key will be needed for Google Maps Platform
# The included public API key in this package is domain restricted
# TO-DO: instructions for deployment
```

### To-do
<table>
<tbody>
<tr>
<td><h5>Features</h5></td>
</tr>
<tr>
<td>Search functionality</td>
</tr>
<tr>
<td>Source filters functionality</td>
</tr>
<tr>
<td>Map style select functionality</td>
</tr>
<tr>
<td>Info/help modal</td>
</tr>
</tbody>
</table>

[Next.js]: https://img.shields.io/github/package-json/dependency-version/bapcon/combat-maps-app/next?color=463f37&logo=next.js&logoColor=fff&style=for-the-badge
[site-link]: https://img.shields.io/badge/Visit_Site-%20?style=for-the-badge&logo=amazonec2&logoColor=white&labelColor=463f37
[aws-templates]: https://img.shields.io/badge/AWS-templates_%26_code-blue?style=for-the-badge&logo=amazons3&logoColor=white