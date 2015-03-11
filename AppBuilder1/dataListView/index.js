'use strict';

app.models.dataListView = (function() {
    return {};
})();
app.models.dataListView.dataListViewList = (function() {

    var dataProvider = app.data.backenddataprovider;

    var source = new kendo.data.DataSource({

        type: 'everlive',
        transport: {

            // Required by Backend Services
            typeName: 'Activities',
            dataProvider: dataProvider

        },

        schema: {
            model: {
                fields: {

                    Activities: {
                        field: 'Activities',
                        defaultValue: ''
                    },
                }

                ,
                icon: function() {
                    var i = 'globe';
                    return kendo.format('km-icon km-{0}', i);
                }

            }
        },

        serverSorting: true,
        serverPaging: true,
        pageSize: 50

    });

    var viewModel = kendo.observable({
        dataSource: source,

        currentItem: null,

        itemClick: function(e) {

            app.mobileApp.navigate('#dataListView/details.html?uid=' + e.dataItem.uid);
        },
        detailsShow: function(e) {
            var item = e.view.params.uid,
                itemModel = source.getByUid(item);

            viewModel.set('currentItem', itemModel);

        }
    });

    return {
        viewModel: viewModel
    };
})();