import './graphCompare.sass'
import useDateService from "../../services/DateService";
import Modal from '../Modal/Modal';

import { useEffect, useState } from "react";


const GraphCompare = () => {
    const { getDate } = useDateService();
    const [res, setRes] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });
    const [selectedItem, setSelectedItem] = useState(null);


    useEffect(() => {
        getDate()
            .then((res) => {
                const combinedResult = {
                    ...dates,
                    ...res
                };
                setRes(combinedResult);
            })
            .catch((error) => {
                console.error(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const dayInMs = 24 * 60 * 60 * 1000;

    const dateRange = (startDate, numOfDays) => {

        const startDateInMs = startDate.getTime()
        const dateArray = [...Array(numOfDays).keys()].map(i => new Date(startDateInMs - i * dayInMs).toISOString().split('T')[0]);
        const resultObject = dateArray.reduce((acc, date) => {
            acc[date] = 0;
            return acc;
        }, {});
        return resultObject;
    }

    let dates = dateRange(new Date(), 357);

    const objectToArrayFromEnd = (obj) => {
        const entries = Object.entries(obj);
        const cutedEntries = entries.slice(-0, 357);

        return cutedEntries;
    }

    function handleSpanClick(event, itemData) {
        const target = event.target;
        const rect = target.getBoundingClientRect();

        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        setClickCoords({ x, y });
        setSelectedItem(itemData);
        setModalVisible(true);

        function closeModal() {
            window.removeEventListener("click", closeModal);
            setModalVisible(false);
        }

        window.addEventListener("click", closeModal);

        event.stopPropagation();
    }

    function renderItems(arr) {
        if (arr === null) {
            return null
        }


        let graphStyle = 'graphCompare__graph graphCompare__graph_1lvl';
        const items = arr.reverse().map((item, i) => {

            if (item[1] >= 1 && item[1] <= 9) {
                graphStyle = 'graphCompare__graph graphCompare__graph_2lvl'
            } else if (item[1] >= 10 && item[1] <= 19) {
                graphStyle = 'graphCompare__graph graphCompare__graph_3lvl'
            } else if (item[1] >= 20 && item[1] <= 29) {
                graphStyle = 'graphCompare__graph graphCompare__graph_4lvl'
            } else if (item[1] >= 30) {
                graphStyle = 'graphCompare__graph graphCompare__graph_5lvl'
            }
            return (
                <>
                    <span onClick={(event) => handleSpanClick(event, item)}
                        key={i}
                        className={item[1] === 0 ?
                            `graphCompare__graph graphCompare__graph_1lvl ${item[0]}` : graphStyle}></span>
                </>
            )
        })
        return items
    }



    const content = res !== null ? renderItems(objectToArrayFromEnd(res)) : null;

    return (
        <div className="graphCompare">
            <div className="graphCompare__wrapper">
                <div className="graphCompare__grid">
                    {content}
                </div>
                <div className="graphCompare__months">
                    <div>Сент.</div>
                    <div>Окт.</div>
                    <div>Нояб.</div>
                    <div>Дек.</div>
                    <div>Янв.</div>
                    <div>Фев.</div>
                    <div>Март</div>
                    <div>Апр.</div>
                    <div>Май</div>
                    <div>Июнь</div>
                    <div>Июль</div>
                    <div>Авг.</div>
                </div>
                <div className="graphCompare__days">
                    <div>Пн</div>
                    <div>Ср</div>
                    <div>Пт</div>
                </div>
                <div className="graphCompare__faq">
                    <div className="graphCompare__text">
                        Меньше
                    </div>
                    <span
                        className="graphCompare__graph graphCompare__graph_1lvl"></span>
                    <span
                        className="graphCompare__graph graphCompare__graph_2lvl"></span>
                    <span
                        className="graphCompare__graph graphCompare__graph_3lvl"></span>
                    <span
                        className="graphCompare__graph graphCompare__graph_4lvl"></span>
                    <span
                        className="graphCompare__graph graphCompare__graph_5lvl"></span>
                    <div className="graphCompare__text">
                        Больше
                    </div>
                </div>
            </div>
            {isModalVisible && selectedItem !== null && (
                <Modal x={clickCoords.x} y={clickCoords.y} onClose={() => setModalVisible(false)} data={selectedItem} />
            )}

        </div>
    )
}


export default GraphCompare;