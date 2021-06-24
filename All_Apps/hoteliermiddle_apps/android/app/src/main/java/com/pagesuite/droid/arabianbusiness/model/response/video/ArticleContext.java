
package com.pagesuite.droid.arabianbusiness.model.response.video;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ArticleContext {

    @SerializedName("und")
    @Expose
    private List<Object> und = null;

    public List<Object> getUnd() {
        return und;
    }

    public void setUnd(List<Object> und) {
        this.und = und;
    }

}
