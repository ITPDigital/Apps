import React, { Component } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FollowList } from "../../components";
import { StartBrandsService, BrandsPreferenceAPI } from "../../service";
import { Actions } from "../../redux";
import { Analytics, Screen } from "../../Analytics";

type Props = {
	navigation: any,
	brands: any,
	selectedBrands: any,
};

class Brands extends Component {
	constructor(props) {
		super(props);
		this.state = {
			preferenceLoading: false,
			imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
		};
		this.magnageBrands(this.props.brands);
	}

	componentDidMount = () => {
		Analytics.setCurrentScreen("SELECT_BRANDS");
	};

	magnageBrands = (brands: array) => {
		const { user, setSelectedBrands } = this.props;
		const alreadySelected = new Set(user["brands"].split("|"));
		const selectedBrands = [];
		brands.forEach(item => {
			if (alreadySelected.has(item.field_site_key)) {
				selectedBrands.push(item);
			}
		});
		setSelectedBrands(selectedBrands);
	};

	onSelected = (brands: array) => {
		const { setSelectedBrands, user } = this.props;
		this.setState({ preferenceLoading: true });
		setSelectedBrands(brands);

		BrandsPreferenceAPI(
			user.id,
			getBrandString(brands),
			this.onSuccess,
			this.onFailure,
			this.onError,
		);
	};

	onSuccess = (response: any, selectedBrands: string) => {
		const { navigation, setUserBrandAction } = this.props;
		this.setState({ preferenceLoading: false });
		setUserBrandAction(selectedBrands);
		navigation.navigate("HomeDrawerScreen");
	};

	onFailure = (response: any) => {
		console.log("OnFailure of Preference Brands: ", response);
	};

	onError = (error: any) => {
		console.log("OnError of Preference Brands: ", error);
	};

	render() {
		const { brands, selectedBrands, navigation, user } = this.props;
		const { preferenceLoading } = this.state;
		return (
			<FollowList
				preferenceLoading={preferenceLoading}
				isBrand
				data={brands}
				onSelected={this.onSelected}
				selectedBrandsList={selectedBrands}
				navigation={navigation}
			/>
		);
	}
}

function getBrandString(selectedBrands) {
	//console.log(selectedBrands);
	let brands = "";
	if (!selectedBrands) return brands;
	selectedBrands.forEach((item, index) => {
		if (index === 0) {
			brands = item.field_site_key;
		} else {
			brands = brands + "|" + item.field_site_key;
		}
	});
	return brands;
}

const mapStateToProps = state => ({
	brands: state.allBrands,
	selectedBrands: state.selectedBrands,
	user: state.user,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Brands);
