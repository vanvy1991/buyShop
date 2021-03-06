import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Home from './Home/Home';
import Contact from './Contact/Contact';
import Cart from './Cart/Cart';
import Search from './Search/Search';
import Header from './Header';

import icHome from '../../../media/appicon/home0.png';
import icHomeSelected from '../../../media/appicon/home.png';
import icCart from '../../../media/appicon/cart0.png';
import icCartSelected from '../../../media/appicon/cart.png';
import icContact from '../../../media/appicon/contact0.png';
import icContactSelected from '../../../media/appicon/contact.png';
import icSearch from '../../../media/appicon/search0.png';
import icSearchSelected from '../../../media/appicon/search.png';
import global from '../../../components/global';

import initData from '../../../api/initData';
import saveCart from '../../../api/saveCart';
import getCart from '../../../api/getCart';

export default class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            types: [],
            topProducts: [],
            cartArray: []
        };
        global.addProductToCart = this.addProduct.bind(this);
    }
    componentDidMount() {
        initData()
            .then(resJson => {
                const { type, product } = resJson;
                this.setState({ types: type, topProducts: product });
            });
        getCart()
            .then(cartArray => this.setState({ cartArray }));
    }

    addProduct(product) {
        this.setState({ cartArray: this.state.cartArray.concat({ product, quality: 1 }) },
            () => saveCart(this.state.cartArray));
    }

    openMenu() {
        const { open } = this.props;
        open();
    }

    render() {
        const { iconStyle } = styles;
        const { types, selectedTab, topProducts, cartArray } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header onOpen={this.openMenu.bind(this)} />
                <TabNavigator>
                    <TabNavigator.Item
                        selected={selectedTab === 'home'}
                        title="Home"
                        onPress={() => this.setState({ selectedTab: 'home' })}
                        renderIcon={() => <Image source={icHome} style={iconStyle} />}
                        renderSelectedIcon={
                            () => <Image source={icHomeSelected} style={iconStyle} />
                        }
                        selectedTitleStyle={{ color: '#26b391' }}
                    >
                        {<Home types={types} topProducts={topProducts} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'cart'}
                        title="Cart"
                        badgeText={cartArray.length}
                        onPress={() => this.setState({ selectedTab: 'cart' })}
                        renderIcon={() => <Image source={icCart} style={iconStyle} />}
                        renderSelectedIcon={
                            () => <Image source={icCartSelected} style={iconStyle} />
                        }
                        selectedTitleStyle={{ color: '#26b391' }}
                    >
                        {<Cart cartArray={cartArray} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'search'}
                        title="Search"
                        onPress={() => this.setState({ selectedTab: 'search' })}
                        renderIcon={() => <Image source={icSearch} style={iconStyle} />}
                        renderSelectedIcon={
                            () => <Image source={icSearchSelected} style={iconStyle} />
                        }
                        selectedTitleStyle={{ color: '#26b391' }}
                    >
                        {<Search />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'contact'}
                        title="Contact"
                        onPress={() => this.setState({ selectedTab: 'contact' })}
                        renderIcon={() => <Image source={icContact} style={iconStyle} />}
                        renderSelectedIcon={
                            () => <Image source={icContactSelected} style={iconStyle} />
                        }
                        selectedTitleStyle={{ color: '#26b391' }}
                    >
                        {<Contact />}
                    </TabNavigator.Item>

                </TabNavigator>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    iconStyle: {
        width: 20,
        height: 20
    }
});
