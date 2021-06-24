
package com.itpmedia.ab.model.response.video;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class FieldPictureRef {

    @SerializedName("und")
    @Expose
    private List<FieldPictureRefUnd> und = null;

    public List<FieldPictureRefUnd> getUnd() {
        return und;
    }

    public void setUnd(List<FieldPictureRefUnd> und) {
        this.und = und;
    }

}
