# TouchDown.js

# Navigate Mars Rover using Pathfinding Algorithms

 This project is made to contribute in **Microsoft Engage'20**.Microsoft Engage is an initiative by **Microsoft** to aid the **Mars Colonisation Programme**.In this project,a web application has been made to help the Mars Rover navigate the planet.The project will visualise the shortest path from a starting point till end point avoiding all the obstructions.We have implemented  AI based shortest path algorithms like **Astar,IDAstar,Best First Search,Jump Point Search** and **Orthogonal Jump Point Search** .We have also implemented **Dijkstra Algorithm** and **Breadth First Search Algorithm** to find the shortest path in the grid.We have given additional functionality of **Diagonal Search** and **Bi-Direction Search** to all possible algorithms.
 
# Additional Functionality
We have provided the user with two kinds of walls.The user can place an infinite wall or a finite wall in the grid.The weight of the finite wall will be entered by the user through a prompt.A rover can never pass throught the infinite wall while if the rover attempts to pass throught the finite wall then the heuristic distance of the wall will suffer a penalty equal to the weight of the wall.The user can place as many kinds of finite wall with varying weights in the grid.The user can also adjust the starting point and end point of the search.

# How To run the Project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

*Note: this is a one-way operation. Once you eject, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

# Dependencies : 
React React-three-fiber react-spring react-router-dom three cannon.js three-orbitcontrols
