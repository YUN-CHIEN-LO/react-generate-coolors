import React, { useState, useEffect, useRef } from "react";
import ColorBlock from "../color-block/ColorBlock";
import style from "./ColorBoard.module.scss";
import { Provider } from "../../context/allColor";
import ColorAdd from "./../color-add/ColorAdd";
import { DEFAULT_COLOR, MAX_LENTH } from "./constant";
import { colorModule, dragDrop } from "../../utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// 顏色模組
const {
  genRandomColors,
  toggleLock,
  showShade,
  hideShade,
  replaceColor,
  removeColor,
  addColor,
} = colorModule;

// 拖拉模組
const { reorder } = dragDrop;

/**
 * 選染色票版
 *
 * @returns {JSX} 渲染樣板
 */
const ColorBoard = () => {
  // 顏色陣列
  const [allColor, setAllColor] = useState(DEFAULT_COLOR);
  // 視窗寬度
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 是否達色票數量上限
  const isAddable = allColor.length < MAX_LENTH;

  // 空白鍵 debounce timer
  const refSpaceListener = useRef({});

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
      // 更新視窗寬度
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

  /**
   * 拖拉結束callback
   *
   * @param {object} result - 拖拉結果
   * @returns {null}
   */
  const onDragEnd = (result) => {
    // 拖拉至陣列之外
    if (!result.destination) {
      return;
    }

    setAllColor((colors) =>
      // 產生新的顏色陣列
      reorder(colors, result.source.index, result.destination.index)
    );
  };

  // 顏色context
  const context = {
    colors: allColor,
    /**
     * 鎖定/解鎖色票
     *
     * @param {number} id - id
     */
    setToggleLock: (id) => {
      setAllColor((colors) => toggleLock(colors, id));
    },
    /**
     * 開啟色階
     *
     * @param {number} id - id
     */
    setShowShade: (id) => {
      setAllColor((colors) => showShade(colors, id));
    },
    /**
     * 關閉色階
     */
    setHideShade: () => {
      setAllColor((colors) => hideShade(colors));
    },
    /**
     * 重設顏色
     *
     * @param {number} id - id
     * @param {string} hex - 新顏色
     */
    setColor: (id, hex) => {
      setAllColor((colors) => replaceColor(colors, id, hex));
    },
    /**
     * 移除色票
     *
     * @param {number} id - id
     */
    removeColor: (id) => {
      setAllColor((colors) => removeColor(colors, id));
    },
    /**
     * 新增色票
     *
     * @param {number} id - id
     */
    addColor: (id) => {
      setAllColor((colors) => addColor(colors, id));
    },
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
              {/* 在最左新增色票 */}
              {windowWidth > 600 && isAddable && <ColorAdd id={"head"} />}
              {context.colors.map((x, index) => (
                <Draggable
                  key={x.id}
                  draggableId={x.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    // 色票單位
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
                        {/* 色票之間的新增 */}
                        {windowWidth > 600 && isAddable && index > 0 && (
                          <ColorAdd id={x.id} />
                        )}
                        {/* 色票本身 */}
                        <ColorBlock windowWidth={windowWidth} colorInfo={x} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {/* 在最右新增色票 */}
              {windowWidth > 600 && isAddable && <ColorAdd id={"end"} />}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Provider>
  );
};

export default ColorBoard;
