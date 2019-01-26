{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 1,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 34.0, 79.0, 918.0, 687.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 373.0, 343.0, 58.0, 22.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 393.0, 375.0, 35.0, 22.0 ],
					"text" : "set 2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 296.0, 293.0, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 271.0, 332.5, 32.0, 22.0 ],
					"text" : "gate"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 940.0, 336.0, 61.0, 22.0 ],
					"text" : "delay 500"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 940.0, 366.0, 35.0, 22.0 ],
					"text" : "open"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 722.0, 366.0, 79.0, 22.0 ],
					"text" : "prepend plug"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 722.0, 336.0, 208.0, 22.0 ],
					"text" : "combine 1 app/vst/TAL-Vocoder-2.vst"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 722.0, 272.0, 32.0, 22.0 ],
					"text" : "path"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 722.0, 302.0, 67.0, 22.0 ],
					"save" : [ "#N", "thispatcher", ";", "#Q", "end", ";" ],
					"text" : "thispatcher"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 722.0, 245.0, 58.0, 22.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-40",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 672.25, 549.0, 38.0, 20.0 ],
					"text" : "R out"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 590.0, 549.0, 38.0, 20.0 ],
					"text" : "L out"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 658.25, 218.0, 38.0, 20.0 ],
					"text" : "R in"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 576.0, 218.0, 38.0, 20.0 ],
					"text" : "L in"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-34",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 444.0, 339.0, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-27",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 260.5, 261.5, 72.0, 22.0 ],
					"text" : "prepend set"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-24",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "bang", "int" ],
					"patching_rect" : [ 250.0, 219.5, 29.5, 22.0 ],
					"text" : "t b i"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 250.0, 363.5, 35.0, 22.0 ],
					"text" : "set 2"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 16.0,
					"id" : "obj-15",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 99.0, 185.0, 137.0, 78.0 ],
					"text" : "Select Parameter Number Here, Press toggle to open gate"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 250.0, 185.0, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-9",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 672.25, 503.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-8",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 600.0, 503.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-7",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 662.25, 245.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-5",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 580.0, 245.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-1",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 444.0, 245.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-31",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 444.0, 408.0, 63.0, 22.0 ],
					"text" : "prepend 0"
				}

			}
, 			{
				"box" : 				{
					"autosave" : 1,
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 8,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "", "list", "int", "", "", "" ],
					"patching_rect" : [ 595.75, 449.0, 92.5, 22.0 ],
					"save" : [ "#N", "vst~", "loaduniqueid", 0, ";" ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_longname" : "vst~[2]",
							"parameter_shortname" : "vst~",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"snapshot" : 					{
						"filetype" : "C74Snapshot",
						"version" : 2,
						"minorversion" : 0,
						"name" : "snapshotlist",
						"origin" : "vst~",
						"type" : "list",
						"subtype" : "Undefined",
						"embed" : 1,
						"snapshot" : 						{
							"pluginname" : "TAL-Vocoder-2.vst",
							"plugindisplayname" : "TAL Vocoder II Plugin",
							"pluginsavedname" : "~/Documents/GitHub/bitlabs/term_2/app/vst/TAL-Vocoder-2.vst",
							"pluginsaveduniqueid" : 0,
							"version" : 1,
							"isbank" : 0,
							"isbase64" : 1,
							"blob" : "1340.CMlaKA....fQPMDZ....AX0SCIC.B.......JDDHV8VZiUFHR8lXuQGHw....................T..VMjLgbOA...OzEFafLVcxAmbuclbg0VOh.iHfXWYxMWZu4VOhDiKv.CLv.CLv.CLv.CLv.CLv.CLv.iH9vCbx81YxEVay4COvI2amIWXsABbx81YxEVatEVak0iHAAhUuk1XkAhTuI1azARLh.hcuwVcsUVOh.iKzjSLzTyLwPCL4bCMvPCM2jSN3.iHffVXx01atk1Xy0iHv3BLv.CLv.CLv.CLv.CLv.CLv.CLvHBHt8VZyUlcuwVcsUVOh.iKv.CLv.CLv.CLv.CLv.CLv.CLv.iHf.WcrMWY18Fa00VY8HBLt.CLv.CLv.CLv.CLv.CLv.CLv.CLh.xbgcmcuwVcsUVOh.iK4biMv.CLvbCL0bSL3jSNzDCMvXiHfLWch81biY2arUWak0iHv3RM0XCLv.CL0LCN3HSM4fCN2XSN0HBHuM2XzIWXtMGbuMWY8HBLtPCLv.CLv.CL0jiMvPiMzPyM2TCMh.BbuwVds8FYk0iHw3BLv.CLv.CLv.CLv.CLv.CLv.CLvHBHv8lbzEVak4Fcu0iHv3BLv.CLv.CLv.CLv.CLv.CLv.CLvHBHzUmak0iHv3RMvfCLv.CLwXiLwHCM1LyL2fSNwHBHo4Fb0QWauQVY8HBLt.CLv.CLv.CLv.CLv.CLv.CLv.CLh.xXn8lb0MWOh.iKv.CLv.CLv.CLv.CLv.CLv.CLv.iHfTla1UFauAWYxUFakE1bk0iHv3xL4HCLv.CLwjSM0.yLxLCM3XyLyHBHuM2Xykmai0iHv3BLv.CLv.CLv.CLv.CLv.CLv.CLvHBHvUGayUFc04VY8HBLtTCL3.CLv.SL1HSLxPiMyLyM3jSLh.xbgcGc04VY8HBLtTCMv.CLv.iLwPSM2XyMxDSL4DCMh.Bb0w1bkYVZtUFc04VY8HBLtTiLz.CLv.CM3XyL2LSNvDyL1biLh.xbgcmYo4VYzUmak0iHv3RMx.CLv.CLz.SMyDSL0fCMzbiL2HBHkM2bkIWZtQWYtMWZzkWOh.iK0fyM4jSN4jSN0HyLwXiL3PSL3.iHfX2ai8FYkImXg4FYv.SOh.iKzXCNv.CLvHCM0TyMwDyL1PyMzXiHfX2ai8FYkImXg4FYvDSOh.iKzbiLv.CLvLiL1XyLyPSMyLiM4DiHfX2ai8FYkImXg4FYvHSOh.iKzXCMv.CLvDiMzTCL3fSL4TCNvDiHfX2ai8FYkImXg4FYvLSOh.iKzPCNv.CLvDyL3HCNxbyM0fyM3jiHfX2ai8FYkImXg4FYvPSOh.iKzPCNv.CLvDyL3HCNxbyM0fyM3jiHfX2ai8FYkImXg4FYvTSOh.iKzXCMv.CLvDiMzTCL3fSL4TCNvDiHfX2ai8FYkImXg4FYvXSOh.iKzbiMv.CLvDCL4XyMxTCM1LCN1biHfX2ai8FYkImXg4FYvbSOh.iKzjiLv.CLvDyL0fSN3TSNv.CN2jiHfX2ai8FYkImXg4FYvfSOh.iKzfCNv.CLvLSMxfSM4PSN2.yMvLiHfX2ai8FYkImXg4FYvjSOh.iKzXCMv.CLvDiMzTCL3fSL4TCNvDiHfX2ai8FYkImXg4FYw.SOh.iKzfCLv.CLvDSNvbyLzfiMyHCNwHiHfLWZjU1XnEVZt0iHv3BLv.CLv.CLv.CLv.CLv.CLv.CLvHxK9vyKvI2amIWXsMmO7zVZjkVagA2K9vyKzEFa9.."
						}
,
						"snapshotlist" : 						{
							"current_snapshot" : 0,
							"entries" : [ 								{
									"filetype" : "C74Snapshot",
									"version" : 2,
									"minorversion" : 0,
									"name" : "TAL Vocoder II Plugin",
									"origin" : "TAL-Vocoder-2.vst",
									"type" : "VST",
									"subtype" : "MidiEffect",
									"embed" : 1,
									"snapshot" : 									{
										"pluginname" : "TAL-Vocoder-2.vst",
										"plugindisplayname" : "TAL Vocoder II Plugin",
										"pluginsavedname" : "~/Documents/GitHub/bitlabs/term_2/app/vst/TAL-Vocoder-2.vst",
										"pluginsaveduniqueid" : 0,
										"version" : 1,
										"isbank" : 0,
										"isbase64" : 1,
										"blob" : "1340.CMlaKA....fQPMDZ....AX0SCIC.B.......JDDHV8VZiUFHR8lXuQGHw....................T..VMjLgbOA...OzEFafLVcxAmbuclbg0VOh.iHfXWYxMWZu4VOhDiKv.CLv.CLv.CLv.CLv.CLv.CLv.iH9vCbx81YxEVay4COvI2amIWXsABbx81YxEVatEVak0iHAAhUuk1XkAhTuI1azARLh.hcuwVcsUVOh.iKzjSLzTyLwPCL4bCMvPCM2jSN3.iHffVXx01atk1Xy0iHv3BLv.CLv.CLv.CLv.CLv.CLv.CLvHBHt8VZyUlcuwVcsUVOh.iKv.CLv.CLv.CLv.CLv.CLv.CLv.iHf.WcrMWY18Fa00VY8HBLt.CLv.CLv.CLv.CLv.CLv.CLv.CLh.xbgcmcuwVcsUVOh.iK4biMv.CLvbCL0bSL3jSNzDCMvXiHfLWch81biY2arUWak0iHv3RM0XCLv.CL0LCN3HSM4fCN2XSN0HBHuM2XzIWXtMGbuMWY8HBLtPCLv.CLv.CL0jiMvPiMzPyM2TCMh.BbuwVds8FYk0iHw3BLv.CLv.CLv.CLv.CLv.CLv.CLvHBHv8lbzEVak4Fcu0iHv3BLv.CLv.CLv.CLv.CLv.CLv.CLvHBHzUmak0iHv3RMvfCLv.CLwXiLwHCM1LyL2fSNwHBHo4Fb0QWauQVY8HBLt.CLv.CLv.CLv.CLv.CLv.CLv.CLh.xXn8lb0MWOh.iKv.CLv.CLv.CLv.CLv.CLv.CLv.iHfTla1UFauAWYxUFakE1bk0iHv3xL4HCLv.CLwjSM0.yLxLCM3XyLyHBHuM2Xykmai0iHv3BLv.CLv.CLv.CLv.CLv.CLv.CLvHBHvUGayUFc04VY8HBLtTCL3.CLv.SL1HSLxPiMyLyM3jSLh.xbgcGc04VY8HBLtTCMv.CLv.iLwPSM2XyMxDSL4DCMh.Bb0w1bkYVZtUFc04VY8HBLtTiLz.CLv.CM3XyL2LSNvDyL1biLh.xbgcmYo4VYzUmak0iHv3RMx.CLv.CLz.SMyDSL0fCMzbiL2HBHkM2bkIWZtQWYtMWZzkWOh.iK0fyM4jSN4jSN0HyLwXiL3PSL3.iHfX2ai8FYkImXg4FYv.SOh.iKzXCNv.CLvHCM0TyMwDyL1PyMzXiHfX2ai8FYkImXg4FYvDSOh.iKzbiLv.CLvLiL1XyLyPSMyLiM4DiHfX2ai8FYkImXg4FYvHSOh.iKzXCMv.CLvDiMzTCL3fSL4TCNvDiHfX2ai8FYkImXg4FYvLSOh.iKzPCNv.CLvDyL3HCNxbyM0fyM3jiHfX2ai8FYkImXg4FYvPSOh.iKzPCNv.CLvDyL3HCNxbyM0fyM3jiHfX2ai8FYkImXg4FYvTSOh.iKzXCMv.CLvDiMzTCL3fSL4TCNvDiHfX2ai8FYkImXg4FYvXSOh.iKzbiMv.CLvDCL4XyMxTCM1LCN1biHfX2ai8FYkImXg4FYvbSOh.iKzjiLv.CLvDyL0fSN3TSNv.CN2jiHfX2ai8FYkImXg4FYvfSOh.iKzfCNv.CLvLSMxfSM4PSN2.yMvLiHfX2ai8FYkImXg4FYvjSOh.iKzXCMv.CLvDiMzTCL3fSL4TCNvDiHfX2ai8FYkImXg4FYw.SOh.iKzfCLv.CLvDSNvbyLzfiMyHCNwHiHfLWZjU1XnEVZt0iHv3BLv.CLv.CLv.CLv.CLv.CLv.CLvHxK9vyKvI2amIWXsMmO7zVZjkVagA2K9vyKzEFa9.."
									}
,
									"fileref" : 									{
										"name" : "TAL Vocoder II Plugin",
										"filename" : "TAL Vocoder II Plugin.maxsnap",
										"filepath" : "~/Documents/Max 8/Snapshots",
										"filepos" : -1,
										"snapshotfileid" : "a823c20614c54aa897e08ce337a5e64d"
									}

								}
 ]
						}

					}
,
					"text" : "vst~",
					"varname" : "vst~",
					"viewvisibility" : 0
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-13", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 1 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"order" : 0,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 0 ],
					"order" : 1,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"midpoints" : [ 259.5, 308.0, 259.5, 308.0 ],
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"midpoints" : [ 270.0, 244.0, 270.0, 244.0 ],
					"source" : [ "obj-24", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 1 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 0 ],
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-6", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 1 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "", -1 ],
					"source" : [ "obj-21", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-6" : [ "vst~[2]", "vst~", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "TAL Vocoder II Plugin.maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../../Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
 ],
		"autosave" : 0,
		"styles" : [ 			{
				"name" : "ksliderWhite",
				"default" : 				{
					"color" : [ 1, 1, 1, 1 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjBlue-1",
				"default" : 				{
					"accentcolor" : [ 0.317647, 0.654902, 0.976471, 1 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjGreen-1",
				"default" : 				{
					"accentcolor" : [ 0, 0.533333, 0.168627, 1 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "numberGold-1",
				"default" : 				{
					"accentcolor" : [ 0.764706, 0.592157, 0.101961, 1 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}
