<!DOCTYPE html>

<html lang="en">

<body>

<h1>Light Pollution Detector Project</h1>

<p>This project, created by <strong>Bhavik</strong> and <strong>Parul Singh</strong>, is designed to detect light pollution in various locations. It utilizes APIs to gather and analyze environmental data, providing insights into areas with significant light pollution.</p>

<h2>Features</h2>
<ul>
    <li>Fetches data from the OpenCage and OpenWeather APIs to determine light pollution levels.</li>
    <li>Stores and retrieves data using MongoDB.</li>
    <li>Secured endpoints using JWT for authentication.</li>
    <li>Real-time data analysis and visualization.</li>
</ul>

<h2>How to Set Up</h2>
<p>To set up this project locally, follow these steps:</p>

<ol>
    <li>Clone the repository to your local machine using <code>git clone</code>.</li>
    <li>Navigate to the project directory.</li>
    <li>Install the necessary dependencies using <code>npm install</code>.</li>
    <li>Create a <code>.env</code> file in the root directory of the project.</li>
</ol>

<h3>.env File Configuration</h3>
<p>In the <code>.env</code> file, you need to include the following keys:</p>
<ul>
    <li><strong>OPENCAGE_API_KEY</strong>: Your API key for OpenCage.</li>
    <li><strong>OPENWEATHER_API_KEY</strong>: Your API key for OpenWeather.</li>
    <li><strong>MONGODB_URI</strong>: Your MongoDB connection URI.</li>
    <li><strong>JWT_SECRET</strong>: Your secret key for JSON Web Token (JWT) authentication.</li>
    <li><strong>PORT</strong>: The port number on which your application will run.</li>
</ul>

<h2>Usage</h2>
<p>After setting up the <code>.env</code> file and installing dependencies, you can start the application using:</p>
<pre><code>npm start</code></pre>

<p>The application will be running on the port you specified in the <code>.env</code> file.</p>

<h2>Contributors</h2>
<p>This project was developed by <strong>Bhavik</strong> and <strong>Parul Singh</strong>.</p>

</body>
</html>
