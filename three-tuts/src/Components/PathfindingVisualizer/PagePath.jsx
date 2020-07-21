import React from "react";
import PathfindingVisualizer from "./PathfindingVisualizer";
import "./PathfindingVisualizer.css";

class PagePath extends PathfindingVisualizer {
  state = {};

  render() {
    return (
      <>
        <div className="button-wrapper2">
          <div className="button4">SELECT ALGORITHM</div>
          {/* <div class="testf"> */}
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>Dijkstra Algorithm</a>
              </div>
              <div class="optf">
                <li onClick={() => super.visualizeDijkstra()}>option1</li>
                <li>option2</li>
                <li>option3</li>
                <li>option4</li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>BFS Algorithm</a>
              </div>
              <div class="optf">
                <li onClick={() => super.visualizeBFS()}>option1</li>
                <li>option2</li>
                <li>option3</li>
                <li>option4</li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>Intelligent A-Star Algorithm</a>
              </div>
              <div class="optf">
                <li onClick={() => super.visualizeIntelligentAstar()}>
                  option1
                </li>
                <li>option2</li>
                <li>option3</li>
                <li>option4</li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>A-Star Algorithm</a>
              </div>
              <div class="optf">
                <li onClick={() => super.visualizeAstar()}>option1</li>
                <li>option2</li>
                <li>option3</li>
                <li>option4</li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>Best first Search</a>
              </div>
              <div class="optf">
                <li onClick={() => super.visualizeBestfs()}>option1</li>
                <li>option2</li>
                <li>option3</li>
                <li>option4</li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>Intelligent Best first Search</a>
              </div>
              <div class="optf">
                <li onClick={() => super.visualizeIBestfs()}>option1</li>
                <li>option2</li>
                <li>option3</li>
                <li>option4</li>
              </div>
            </div>
          </div>
          <div class="buttf2" tabindex="1">
            <div class="buttf">
              <div class="buttonfi">
                <a>IDA Star</a>
              </div>
              <div class="optf">
                <li onClick={() => super.visualizeIDAstar()}>option1</li>
                <li>option2</li>
                <li>option3</li>
                <li>option4</li>
              </div>
            </div>
          </div>
        </div>

        <div className="inibutt">
          <div className="startendwrap">
            <div className="pauseresume" tabIndex="2"></div>
          </div>

          <div className="iniwrap">
            <div className="pathwall" onClick={(grid) => super.clearPath(grid)}>
              Clear Path
            </div>
          </div>

          <div className="startendwrap">
            <div
              onClick={async () => {
                window.location = "http://localhost:3000/end";
              }}
              className="startend2"
            >
              END
            </div>
          </div>

          <div className="iniwrap">
            <div className="pathwall" onClick={(grid) => super.clearwall(grid)}>
              Clear Wall
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PagePath;
