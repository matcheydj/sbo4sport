// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.ui.tile.ImageTileRenderer");jQuery.sap.require("sap.ushell.ui.tile.TileBaseRenderer");sap.ushell.ui.tile.ImageTileRenderer=sap.ui.core.Renderer.extend(sap.ushell.ui.tile.TileBaseRenderer);sap.ushell.ui.tile.ImageTileRenderer.renderPart=function(r,c){r.write("<img");r.addClass("sapUshellImageTile");r.writeClasses();r.writeAttributeEscaped("src",c.getImageSource());r.write("/>")}}());