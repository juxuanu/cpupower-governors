/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = 'cpupower-governor';

const { GObject, St } = imports.gi;

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util; // Needed for Util.spawn

const PopupMenuGO = GObject.registerClass(
class PopupCPUMenuItem extends PopupMenu.PopupBaseMenuItem {
    _init() {
        super._init(0.0, _('CPU Governor'));

        let itemSeparator = new PopupMenu.PopupSeparatorMenuItem()
        Main.panel.statusArea.aggregateMenu._power._item.menu.addMenuItem(itemSeparator);

        let itemBattery = new PopupMenu.PopupMenuItem(_('Battery Life'));
        Main.panel.statusArea.aggregateMenu._power._item.menu.addMenuItem(itemBattery);
        itemBattery.connect('activate', () => {
            Util.spawn(['/bin/bash', '-c', "pkexec cpupower frequency-set -g powersave"]);
        });

        let itemSchedutil = new PopupMenu.PopupMenuItem(_("Balanced"));
        Main.panel.statusArea.aggregateMenu._power._item.menu.addMenuItem(itemSchedutil);
        itemSchedutil.connect('activate', () => {
            Util.spawn(['/bin/bash', '-c', "pkexec cpupower frequency-set -g schedutil"])
        });

        let itemPerf = new PopupMenu.PopupMenuItem(_("Performance"));
        Main.panel.statusArea.aggregateMenu._power._item.menu.addMenuItem(itemPerf);
        itemPerf.connect('activate', () => {
            Util.spawn(['/bin/bash', '-c', "pkexec cpupower frequency-set -g performance"])
        });
 
    }
});

class Extension {
    constructor(uuid) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._popup = new PopupMenuGO();
        // Main.panel.addToStatusArea(this._uuid, this._popup);
    }

    disable() {
        this._popup.destroy();
        this._popup = null;
    }

    destroy() {
        super.destroy();
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
