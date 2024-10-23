const arrowItemRussianLang: Map<number, string> = new Map([
    [1, 'Вверх'],
    [2, 'Вниз'],
    [3, 'Влево'],
    [4, 'Вправо'],
    [5, '<Выберите команду>']
])


export const getArrowItemRussianLang = (arrowIndex:number) => {
    return arrowItemRussianLang.get(arrowIndex);
}
