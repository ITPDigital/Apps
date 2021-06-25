import React from "react";
import { Metrics } from "../../asset";
import ArticleListContainer from "./ArticleListContainer";
import ArticleListTabletContainer from "./ArticleListTabletContainer";

export const ArticleList = (props: any) => {
	if (Metrics.isTablet) {
		return <ArticleListTabletContainer {...props} />;
	}
	return <ArticleListContainer {...props} />;
};
