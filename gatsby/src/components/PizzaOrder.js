import GatsbyImage from 'gatsby-image';
import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import Img from 'gatsby-image';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder, }) {
    return <>
        {order.map((singleOrder, index) => {
            const pizza = pizzas.find(pizza => pizza.id === singleOrder.id);
            // key value below adds interpolated index so that if user adds the same pizza twice it gets a unique key
            return <MenuItemStyles key={`${singleOrder.id}-${index}`}>
                <Img fluid={pizza.image.asset.fluid} />
                <h2>{pizza.name}</h2>
                <p>
                    {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
                    <button 
                        type="button" 
                        className="remove" 
                        title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
                        onClick={() => removeFromOrder(index)}
                        >
                        &times;
                    </button>
                </p>
            </MenuItemStyles>
        })}
    </>
}