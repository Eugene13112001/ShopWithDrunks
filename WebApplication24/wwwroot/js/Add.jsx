
class Number extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.print = this.print.bind(this);
        this.change = this.change.bind(this);
        this.state = {
            id: props.id,
            color : '' ,
            number: props.number,
        };

    }
    componentWillReceiveProps(props) {

        this.props = props;
    }
    
    change(e) {
        this.props.change(this.state.id, e.target.value);
    }
    print() {
        let top = this.props.top + 'px';
        let left = this.props.left + 'px';
      
        return <div style={{ border: this.props.color, marginTop: top, marginLeft: left, zIndex: this.state.id }} className="number">
            <input className="inp" onChange={this.change} value={this.props.number} type="number" /> 
        </div>;
    }
    render() {

        return <div>
            {this.print()}
        </div>;
    }
}



class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.change = this.change.bind(this);
        this.printbtn = this.printbtn.bind(this);
        this.clickbtn = this.clickbtn.bind(this);
        this.printinput = this.printinput.bind(this);
        this.state = {
            number: 0 ,
        };

    }
    componentWillReceiveProps(props) {

        this.props = props;
    }
    change(e) {
        this.setState({ number: e.target.value, })
    }
    printinput() {
        
        return <div>
            <div>
                <label className="labelsort">Введите значение, которое хотите ввести в массив</label>
                </div>
            <input onChange={this.change} value={this.state.number} type="number" /> </div>
        
    }
    clickbtn() {
        this.props.add(this.state.number);
    }
    printbtn() {
        return <div>
            <button className="bbutton" onClick={this.clickbtn}>Добавить</button>
        </div>;
    }
    render() {

        return <div>
           
            {this.printinput()}
            {this.printbtn()}
        </div>;
    }
}
class DelButton extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.change = this.change.bind(this);
        this.printbtn = this.printbtn.bind(this);
        this.clickbtn = this.clickbtn.bind(this);
        this.printinput = this.printinput.bind(this);
        this.state = {
            number: 0,
        };

    }
    componentWillReceiveProps(props) {

        this.props = props;
    }
    change(e) {
        this.setState({ number: e.target.value, })
    }
    printinput() {

        return <div>
            <div>
                <label className="labelsort">Введите индекс элемента, который хотите удалить из массива</label>
                </div>
            <input onChange={this.change} value={this.state.number} type="number" /> </div>

    }
    clickbtn() {
        this.props.del(this.state.number);
    }
    printbtn() {
        return <div>
            <button className="bbutton" onClick={this.clickbtn}>Удалить</button>
        </div>;
    }
    render() {

        return <div>
            {this.printinput()}
            {this.printbtn()}
        </div>;
    }
}

class SortButton extends React.Component {
    constructor(props) {
        super(props);      
        this.state = {
            array: [],
            sort: false,
        };

    }   
    render() {

        return <div>
            
            <input onChange={this.change} value={this.props.number} type="number" />  
            <div>
                <button className="bbutton"> Поиск </button>
             </div>
        </div>;
    }
}



class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.printlabel = this.printlabel.bind(this);
        this.add = this.add.bind(this);
        this.sort = this.sort.bind(this);
        this.printbin = this.printbin.bind(this);
        this.change = this.change.bind(this);
        this.binpoisk = this.binpoisk.bind(this);
        this.changebin = this.changebin.bind(this);
        this.delete = this.delete.bind(this);
        this.state = {
            array: [],
            label: '',
            searchnumb : 0,
            sort: false,
            numbin : 0 ,
        };

    }
    delete(id) {
        let i = parseInt(id);
        let newarray = this.state.array.filter((num, index) => index !== i);
        for (let j = i; j < newarray.length; j++)
            newarray[j].left = 110 * (j + 1);
        this.setState({ array: newarray,  });
    }
    print() {
        let viewsarray = [];
        for (let i = 0; i < this.state.array.length; i++) {
            viewsarray.push(<Number color={this.state.array[i].color} id={i} left={this.state.array[i].left} top={this.state.array[i].top} change={this.change} number={this.state.array[i].number} id={i} />);
        }
        return <div className= "array">
            {viewsarray}
        </div>;
    }
    moveup() {
        setTimeout(function () {

            this.state.array[0].top = this.state.array[0].top - 2;
            this.setState({ array: this.state.array });

        }, 25);
    }
    
    printlabel() {
        return <div><label className="labelsort2">{this.state.label} </label></div>
    }
    binpoisk() {

        let first = 0;
        let second = this.state.array.length - 1;
        let mid = (first + second) / 2;
        const async_func = (first, second) => {
            return new Promise((resolve, reject) => {
                let timerId = setInterval(() => {
                    let mid = parseInt((first + second) / 2);
                    this.state.array[first].color = '8px solid #00FF00';
                    this.state.array[second].color = '8px solid #00FF00';
                    this.state.array[mid].color = '8px solid #FFFF00';
                    if (this.state.array[mid].number < this.state.numbin) 
                        this.setState({ array: this.state.array, label: 'Берем элемент, располагающийся посередине, его значение - ' + this.state.array[mid].number + ' он меньше чем искомый элемент, поэтому мы смещаем правую границу на этот элемент'});
                    else
                        this.setState({ array: this.state.array, label: 'Берем элемент, располагающийся посередине, его значение - ' + this.state.array[mid].number + ' он меньше чем искомый элемент, поэтому мы смещаем левую границу на этот элемент' });

                }, 500);
                setTimeout(() => {
                    clearInterval(timerId);
                    let mid = parseInt((first + second) / 2);
                    this.state.array[first].color = '8px solid #E81E25';
                    this.state.array[second].color = '8px solid #E81E25';
                    this.state.array[mid].color = '8px solid #E81E25';
                    this.setState({ array: this.state.array });
                    if (this.state.array[mid].number < this.state.numbin) {
                        resolve({ first: mid, second: second });
                    }
                    else
                        resolve({ first: first, second: mid });
                    
                }, 7500);
                
            })
        }
        const async_func2 =async (pos, search) => {
            return new Promise((resolve, reject) => {
                let final = (this.state.array[pos].number == search);
                this.state.array[pos].color = '8px solid #FFFF00';
                if (this.state.array[pos].number == search)
                    this.setState({ array: this.state.array, label: 'Идет проверка левого из двух последних элементов массива , он равен искомому элементу, и поэтому ответ равен индексу этого элемента: ' + pos, });
                else
                    this.setState({ array: this.state.array, label: 'Идет проверка левого из двух последних элементов массива , он не равен искомому элементу, и поэтому проверяем правый', });
                let timerId = setInterval(() => {

                    this.state.array[pos].color = '8px solid #E81E25';
                    this.setState({ array: this.state.array });


                }, 7500);

                setTimeout(() => {

                    clearInterval(timerId);
                    resolve(final);

                }, 7500);
                

            }).then(result => {
                let final = result;
                if (!final) {
                    final = (this.state.array[pos + 1].number == search);
                    this.state.array[pos + 1].color = '8px solid #FFFF00';
                    if (this.state.array[pos + 1].number == search)
                        this.setState({ array: this.state.array, label: 'Идет проверка правого  из двух последних элементов массива , он равен искомому элементу, и поэтому ответ равен индексу этого элемента: ' + (pos + 1), });
                    else
                        this.setState({ array: this.state.array, label: 'Идет проверка правого  из двух последних элементов массива , он не равен искомому элементу, и поэтому искомого элемента в массиве нет', });
                    let timerId = setInterval(() => {

                        this.state.array[pos + 1].color = '8px solid #E81E25';
                        this.setState({ array: this.state.array });
                    }, 7500);

                    setTimeout(() => {
                        clearInterval(timerId);
                        resolve(final);

                    }, 7500);
                }

            },
                error => {
                    alert("Rejected: " + error); 
                })
        }
        const main = async (search) => {
            let first = 0;
            let second = this.state.array.length - 1;
            while (first < second) {
                if (first == second-1) {
                    let y = await async_func2(first, search);
                   return;
                }
                let response = await async_func(first, second, search);
                first = response.first;
                second = response.second;
            }
            }
        let a = main(this.state.numbin);
    }
    sort() {
        const async_func = (oldpos, newpos) => {
            return new Promise((resolve, reject) => {

                let timerId = setInterval(() => {
                    this.state.array[oldpos].top = this.state.array[oldpos].top - 2;
                    this.setState({ array: this.state.array });
                }, 50);

                setTimeout(() => {
                    clearInterval(timerId);
                    let timerId2 = setInterval(() => {
                        this.state.array[oldpos].left = this.state.array[oldpos].left + 2;
                        this.setState({ array: this.state.array });
                    }, 100);
                    let timerId3 = setInterval(() => {
                        this.state.array[newpos].left = this.state.array[newpos].left - 2;
                        this.setState({ array: this.state.array });
                    }, 100);
                    setTimeout(() => {
                        clearInterval(timerId2);
                        let timerId4 = setInterval(() => {
                            this.state.array[oldpos].top = this.state.array[oldpos].top + 2;
                            this.setState({ array: this.state.array });
                        }, 50);

                        setTimeout(() => {
                            clearInterval(timerId4);
                            resolve('true');
                        }, 3000);

                    }, 5500);
                    setTimeout(() => {
                        clearInterval(timerId3);

                    }, 5500);

                }, 3000);
                
            })
        }
        const async_func2 = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('true');

                }, 5500);
               
            })
        }
        const main = async () => {
            for (var i = 0, endI = this.state.array.length - 1; i < endI; i++) {
                var wasSwap = false;
                for (var j = 0, endJ = endI - i; j < endJ; j++) {
                    if (this.state.array[j].number > this.state.array[j + 1].number) {
                        this.state.array[j].color = '8px solid #FFFF00';
                        this.state.array[j + 1].color = '8px solid #FFFF00';
                        this.setState({ array: this.state.array , label: 'Элемент с индексом ' + j + ' больше  чем элемент с индексом ' + (j + 1) + ', поэтому меняем их местами' });
                        const result = await async_func(j, j + 1);
                        let swap = this.state.array[j].number;
                        let left = this.state.array[j].left;
                        this.state.array[j].number = this.state.array[j + 1].number;
                        this.state.array[j + 1].number = swap;
                        this.state.array[j].left = this.state.array[j + 1].left;
                        this.state.array[j + 1].left = left;
                        wasSwap = true;
                        this.setState({ array: this.state.array })
                    }
                    else {
                        this.state.array[j].color = '8px solid #FFFF00';
                        this.state.array[j + 1].color = '8px solid #FFFF00';
                        this.setState({ array: this.state.array  ,  label: 'Элемент с индексом ' + j + ' меньше чем элемент с индексом ' + (j + 1) + ', поэтому ничего не меняем' });
                        const result = await async_func2();
                    }
                    this.state.array[j].color = '8px solid #E81E25';
                    this.state.array[j + 1].color = '8px solid #E81E25';
                    this.setState({ array: this.state.array });
                }
                if (!wasSwap) {
                    this.setState({ label: 'Сортировка завершена', sort: true });
                    break
                };
                if (i == (this.state.array.length - 1)) {
                    this.setState({ label: 'Сортировка завершена', sort: true });
                    break
                }
            }
   
        }       
        main();
       
       
    }
    change(id, newnum) {
        this.state.array[id].number = parseInt(newnum, 10);
        this.setState({ sort: false,  array: this.state.array });
    }
    changebin(e) {
        let k = parseInt(e.target.value, 10);
        this.setState({ numbin: k, })
    }
    printbin() {
        if (this.state.sort) {
            return <div>
                <div><label className="labelsort">Введите значение, котрое хоите найти </label> </div>
                <input  type="number" onChange={this.changebin} value={this.state.numbin} />
                <button className="bbutton" onClick={this.binpoisk}>Бинарный поиск </button>
            </div>;
        }
        else {
            return <div> </div>;
        }
    }
    add( newnumber) {
        this.state.array.push({
            number: newnumber, 
            top: -120,
            left: 110 * (this.state.array.length + 1),
            color: '8px solid #E81E25' ,

        });
        this.setState({sort: false, array: this.state.array,  });
    }
    render() {

        return <div>
           
            <label className="labelsort" >Сортировка пузырьком </label>
            {this.print()}
            {this.printlabel()}
            {this.printbin()}
            <AddButton add={this.add} />
            <DelButton del={this.delete} />
            <button className='bbutton' onClick={this.sort}> Сортировка</button>
        </div>;
    }
}

ReactDOM.render(
    <Panel />,
    document.getElementById("content")
);