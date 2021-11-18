import React, { useState, useEffect, useRef } from "react";
import ColorBlock from "../color-block/ColorBlock";
import style from "./ColorBoard.module.scss";
import { Provider } from "../../context/allColor";
import ColorAdd from "./../color-add/ColorAdd";
import { DEFAULT_COLOR, MAX_LENTH } from "./constant";
import { colorModule } from "../../utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const {
  genRandomColors,
  toggleLock,
  showShade,
  hideShade,
  replaceColor,
  removeColor,
  addColor,
} = colorModule;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ColorBoard = () => {
  const [allColor, setAllColor] = useState(DEFAULT_COLOR);

  const context = {
    colors: allColor,
    setToggleLock: (id) => {
      setAllColor((colors) => toggleLock(colors, id));
    },
    setShowShade: (id) => {
      setAllColor((colors) => showShade(colors, id));
    },
    setHideShade: () => {
      setAllColor((colors) => hideShade(colors));
    },
    setColor: (id, hex) => {
      setAllColor((colors) => replaceColor(colors, id, hex));
    },
    removeColor: (id) => {
      setAllColor((colors) => removeColor(colors, id));
    },
    addColor: (id) => {
      setAllColor((colors) => addColor(colors, id));
    },
  };

  const refSpaceListener = useRef({});

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 監聽空白鍵事件
  useEffect(() => {
    // 回乎函式
    const onPress = (event) => {
      event.preventDefault();
      // 簡單debounce
      clearTimeout(refSpaceListener.current);
      refSpaceListener.current = setTimeout(() => {
        // 產生新的色票
        setAllColor((colors) => genRandomColors(colors));
      }, 300);
    };

    // 掛載監聽事件
    document.addEventListener("keydown", (event) => onPress(event));
    window.addEventListener("resize", (event) => {
      setWindowWidth(() => window.innerWidth);
    });

    // 取消函式
    return () => {
      // 移除監聽事件
      document.removeEventListener("keydown", (event) => onPress(event));
      window.removeEventListener("resize", (event) => {
        setWindowWidth(() => window.innerWidth);
      });
    };
  }, []);

  const isAddable = allColor.length < MAX_LENTH;

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      allColor,
      result.source.index,
      result.destination.index
    );

    setAllColor((colors) => items);
  };

  return (
    <Provider value={context}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="droppable"
          direction={windowWidth > 600 ? "horizontal" : "vertical"}
        >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              className={style.board}
              ref={provided.innerRef}
            >
              {windowWidth > 600 && isAddable && <ColorAdd id={"head"} />}
              {context.colors.map((x, index) => (
                <Draggable
                  key={x.id}
                  draggableId={x.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={style.board__wrapper}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        style={{
                          width:
                            windowWidth > 600
                              ? `${100 / allColor.length}vw`
                              : "100vw",
                          height:
                            windowWidth > 600
                              ? "100vh"
                              : `${100 / allColor.length}vh`,
                        }}
                      >
                        {windowWidth > 600 && isAddable && index > 0 && (
                          <ColorAdd id={x.id} />
                        )}
                        <ColorBlock windowWidth={windowWidth} colorInfo={x} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {windowWidth > 600 && isAddable && <ColorAdd id={"end"} />}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Provider>
  );
};

export default ColorBoard;
