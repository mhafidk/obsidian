"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
class AutoMoveChecked extends obsidian_1.Plugin {
    async onload() {
        this.registerEvent(this.app.workspace.on("editor-change", (editor) => {
            const view = this.app.workspace.getActiveViewOfType(obsidian_1.MarkdownView);
            if (!view)
                return;
            const content = editor.getValue();
            const lines = content.split("\n");
            // Buckets for priorities
            const uncheckedBuckets = {
                P0: [],
                P1: [],
                P2: [],
                P3: [],
                other: [],
            };
            const checkedBuckets = {
                P0: [],
                P1: [],
                P2: [],
                P3: [],
                other: [],
            };
            for (const line of lines) {
                const isChecked = /^\s*[-*]\s*\[x\]/i.test(line);
                const isUnchecked = /^\s*[-*]\s*\[ \]/.test(line);
                // Detect bucket by keyword
                let bucket = "other";
                if (line.includes("P0"))
                    bucket = "P0";
                else if (line.includes("P1"))
                    bucket = "P1";
                else if (line.includes("P2"))
                    bucket = "P2";
                else if (line.includes("P3"))
                    bucket = "P3";
                if (isChecked) {
                    checkedBuckets[bucket].push(line);
                }
                else if (isUnchecked) {
                    uncheckedBuckets[bucket].push(line);
                }
                else {
                    // Non-task lines always go to "other" unchecked
                    uncheckedBuckets.other.push(line);
                }
            }
            // Final order: unchecked P0→P1→P2→P3→other, then checked P0→P1→P2→P3→other
            const newContent = [
                ...uncheckedBuckets.P0,
                ...uncheckedBuckets.P1,
                ...uncheckedBuckets.P2,
                ...uncheckedBuckets.P3,
                ...uncheckedBuckets.other,
                ...checkedBuckets.P0,
                ...checkedBuckets.P1,
                ...checkedBuckets.P2,
                ...checkedBuckets.P3,
                ...checkedBuckets.other,
            ].join("\n");
            if (newContent !== content) {
                const cursor = editor.getCursor();
                editor.setValue(newContent);
                editor.setCursor(cursor);
            }
        }));
    }
}
exports.default = AutoMoveChecked;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBZ0Q7QUFFaEQsTUFBcUIsZUFBZ0IsU0FBUSxpQkFBTTtJQUNqRCxLQUFLLENBQUMsTUFBTTtRQUNWLElBQUksQ0FBQyxhQUFhLENBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNoRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBWSxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUVsQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVsQyx5QkFBeUI7WUFDekIsTUFBTSxnQkFBZ0IsR0FBNkI7Z0JBQ2pELEVBQUUsRUFBRSxFQUFFO2dCQUNOLEVBQUUsRUFBRSxFQUFFO2dCQUNOLEVBQUUsRUFBRSxFQUFFO2dCQUNOLEVBQUUsRUFBRSxFQUFFO2dCQUNOLEtBQUssRUFBRSxFQUFFO2FBQ1YsQ0FBQztZQUNGLE1BQU0sY0FBYyxHQUE2QjtnQkFDL0MsRUFBRSxFQUFFLEVBQUU7Z0JBQ04sRUFBRSxFQUFFLEVBQUU7Z0JBQ04sRUFBRSxFQUFFLEVBQUU7Z0JBQ04sRUFBRSxFQUFFLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLEVBQUU7YUFDVixDQUFDO1lBRUYsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDekIsTUFBTSxTQUFTLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWxELDJCQUEyQjtnQkFDM0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDO2dCQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUFFLE1BQU0sR0FBRyxJQUFJLENBQUM7cUJBQ2xDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQUUsTUFBTSxHQUFHLElBQUksQ0FBQztxQkFDdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDO3FCQUN2QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUFFLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBRTVDLElBQUksU0FBUyxFQUFFLENBQUM7b0JBQ2QsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztxQkFBTSxJQUFJLFdBQVcsRUFBRSxDQUFDO29CQUN2QixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixnREFBZ0Q7b0JBQ2hELGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7WUFDSCxDQUFDO1lBRUQsMkVBQTJFO1lBQzNFLE1BQU0sVUFBVSxHQUFHO2dCQUNqQixHQUFHLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ3RCLEdBQUcsZ0JBQWdCLENBQUMsRUFBRTtnQkFDdEIsR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUN0QixHQUFHLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ3RCLEdBQUcsZ0JBQWdCLENBQUMsS0FBSztnQkFDekIsR0FBRyxjQUFjLENBQUMsRUFBRTtnQkFDcEIsR0FBRyxjQUFjLENBQUMsRUFBRTtnQkFDcEIsR0FBRyxjQUFjLENBQUMsRUFBRTtnQkFDcEIsR0FBRyxjQUFjLENBQUMsRUFBRTtnQkFDcEIsR0FBRyxjQUFjLENBQUMsS0FBSzthQUN4QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUViLElBQUksVUFBVSxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0IsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFyRUQsa0NBcUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGx1Z2luLCBNYXJrZG93blZpZXcgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b01vdmVDaGVja2VkIGV4dGVuZHMgUGx1Z2luIHtcbiAgYXN5bmMgb25sb2FkKCkge1xuICAgIHRoaXMucmVnaXN0ZXJFdmVudChcbiAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbihcImVkaXRvci1jaGFuZ2VcIiwgKGVkaXRvcikgPT4ge1xuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcbiAgICAgICAgaWYgKCF2aWV3KSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29udGVudCA9IGVkaXRvci5nZXRWYWx1ZSgpO1xuICAgICAgICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoXCJcXG5cIik7XG5cbiAgICAgICAgLy8gQnVja2V0cyBmb3IgcHJpb3JpdGllc1xuICAgICAgICBjb25zdCB1bmNoZWNrZWRCdWNrZXRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7XG4gICAgICAgICAgUDA6IFtdLFxuICAgICAgICAgIFAxOiBbXSxcbiAgICAgICAgICBQMjogW10sXG4gICAgICAgICAgUDM6IFtdLFxuICAgICAgICAgIG90aGVyOiBbXSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2hlY2tlZEJ1Y2tldHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHtcbiAgICAgICAgICBQMDogW10sXG4gICAgICAgICAgUDE6IFtdLFxuICAgICAgICAgIFAyOiBbXSxcbiAgICAgICAgICBQMzogW10sXG4gICAgICAgICAgb3RoZXI6IFtdLFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgICAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9IC9eXFxzKlstKl1cXHMqXFxbeFxcXS9pLnRlc3QobGluZSk7XG4gICAgICAgICAgY29uc3QgaXNVbmNoZWNrZWQgPSAvXlxccypbLSpdXFxzKlxcWyBcXF0vLnRlc3QobGluZSk7XG5cbiAgICAgICAgICAvLyBEZXRlY3QgYnVja2V0IGJ5IGtleXdvcmRcbiAgICAgICAgICBsZXQgYnVja2V0ID0gXCJvdGhlclwiO1xuICAgICAgICAgIGlmIChsaW5lLmluY2x1ZGVzKFwiUDBcIikpIGJ1Y2tldCA9IFwiUDBcIjtcbiAgICAgICAgICBlbHNlIGlmIChsaW5lLmluY2x1ZGVzKFwiUDFcIikpIGJ1Y2tldCA9IFwiUDFcIjtcbiAgICAgICAgICBlbHNlIGlmIChsaW5lLmluY2x1ZGVzKFwiUDJcIikpIGJ1Y2tldCA9IFwiUDJcIjtcbiAgICAgICAgICBlbHNlIGlmIChsaW5lLmluY2x1ZGVzKFwiUDNcIikpIGJ1Y2tldCA9IFwiUDNcIjtcblxuICAgICAgICAgIGlmIChpc0NoZWNrZWQpIHtcbiAgICAgICAgICAgIGNoZWNrZWRCdWNrZXRzW2J1Y2tldF0ucHVzaChsaW5lKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzVW5jaGVja2VkKSB7XG4gICAgICAgICAgICB1bmNoZWNrZWRCdWNrZXRzW2J1Y2tldF0ucHVzaChsaW5lKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm9uLXRhc2sgbGluZXMgYWx3YXlzIGdvIHRvIFwib3RoZXJcIiB1bmNoZWNrZWRcbiAgICAgICAgICAgIHVuY2hlY2tlZEJ1Y2tldHMub3RoZXIucHVzaChsaW5lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaW5hbCBvcmRlcjogdW5jaGVja2VkIFAw4oaSUDHihpJQMuKGklAz4oaSb3RoZXIsIHRoZW4gY2hlY2tlZCBQMOKGklAx4oaSUDLihpJQM+KGkm90aGVyXG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBbXG4gICAgICAgICAgLi4udW5jaGVja2VkQnVja2V0cy5QMCxcbiAgICAgICAgICAuLi51bmNoZWNrZWRCdWNrZXRzLlAxLFxuICAgICAgICAgIC4uLnVuY2hlY2tlZEJ1Y2tldHMuUDIsXG4gICAgICAgICAgLi4udW5jaGVja2VkQnVja2V0cy5QMyxcbiAgICAgICAgICAuLi51bmNoZWNrZWRCdWNrZXRzLm90aGVyLFxuICAgICAgICAgIC4uLmNoZWNrZWRCdWNrZXRzLlAwLFxuICAgICAgICAgIC4uLmNoZWNrZWRCdWNrZXRzLlAxLFxuICAgICAgICAgIC4uLmNoZWNrZWRCdWNrZXRzLlAyLFxuICAgICAgICAgIC4uLmNoZWNrZWRCdWNrZXRzLlAzLFxuICAgICAgICAgIC4uLmNoZWNrZWRCdWNrZXRzLm90aGVyLFxuICAgICAgICBdLmpvaW4oXCJcXG5cIik7XG5cbiAgICAgICAgaWYgKG5ld0NvbnRlbnQgIT09IGNvbnRlbnQpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgZWRpdG9yLnNldFZhbHVlKG5ld0NvbnRlbnQpO1xuICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3IoY3Vyc29yKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=