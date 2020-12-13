import React, { useContext } from 'react'
import { DressContext } from '../contexts/DressContext';

const Filter: React.FC = () => {
    const { dresses, size, sort, sortDresses, filterDresses } = useContext(DressContext);

    return (
        <div className="filter">
            <div className="filter-result">
                {dresses.length}
                Dresses
            </div>

            <div className="filter-sort">
                {" "}
                Order{" "}
                <select value={sort} onChange={sortDresses}>
                    <option>Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>

            <div className="filter-size">
              Filter{" "}
              <select value={size} onChange={filterDresses}>
                <option>ALL</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
        </div>
    )
}

export default Filter
